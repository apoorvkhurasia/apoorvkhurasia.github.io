import { del } from '../lib/utils';
import { Chapter, Topic } from '../model/model';
export class FileSystemController {
    contentRootHandle;
    observers = [];
    metadata = null;
    constructor(contentRootHandle) {
        this.contentRootHandle = contentRootHandle;
    }
    async getMetadata() {
        let metadata = this.metadata;
        if (metadata === null) {
            metadata = await this.getMetadataFromFile();
        }
        if (metadata === null) {
            metadata = {
                id: crypto.randomUUID(),
                displayName: 'My first notebook',
                topics: [],
            };
        }
        this.metadata = metadata;
        return metadata;
    }
    async initialiseNewStore(options) {
        this.metadata = {
            id: crypto.randomUUID(),
            displayName: options.storeName,
            topics: [],
        };
        await this.writeMetadataToFile();
    }
    addObserver(obs) {
        const index = this.observers.indexOf(obs);
        if (index <= 0) {
            this.observers.push(obs);
        }
    }
    removeObserver(obs) {
        del(this.observers, obs);
    }
    async getTopics() {
        const topics = new Array();
        const metadata = await this.getMetadata();
        for (const topicShell of metadata.topics) {
            const topic = new Topic(topicShell.id, topicShell.displayName);
            for (const chapterShell of topicShell.chapters) {
                topic.addChapter(new Chapter(chapterShell.id, chapterShell.displayName));
            }
            topics.push(topic);
        }
        return topics;
    }
    async getChapterText(chapter) {
        const chapterHandle = await this.getChapterFileHandle(chapter, false);
        if (chapterHandle === null) {
            return ''; //TODO: Handle missing chapter content with a warning icon later
        }
        return await (await chapterHandle.getFile()).text();
    }
    async deleteTopic(topic) {
        const metadata = await this.getMetadata();
        const remainingTopics = new Array();
        for (const t of metadata.topics) {
            if (t.id !== topic.getId()) {
                remainingTopics.push(t);
            }
            else {
                for (const c of topic.getChapters()) {
                    await this.deleteChapter(c);
                }
            }
        }
        metadata.topics = remainingTopics;
        this.writeMetadataToFile();
        this.observers.forEach(obs => obs.onTopicDeleted(topic));
    }
    async deleteChapter(chapter) {
        try {
            const topic = chapter.getTopic();
            if (topic === null) {
                return;
            }
            const metadata = await this.getMetadata();
            for (const topicShell of metadata.topics) {
                if (topicShell.id === topic.getId()) {
                    topicShell.chapters = topicShell.chapters.filter(c => c.id !== chapter.getId());
                    break;
                }
            }
            this.writeMetadataToFile();
            await this.contentRootHandle.removeEntry(FileSystemController.getChapterFileName(chapter));
            this.observers.forEach(obs => obs.onChapterDeleted(chapter));
        }
        catch (err) {
            console.log('Error deleting chapter');
            console.log(err);
        }
    }
    async renameTopic(topic, newName) {
        const metadata = await this.getMetadata();
        for (const topicShell of metadata.topics) {
            if (topicShell.id === topic.getId()) {
                topicShell.displayName = newName;
            }
            break;
        }
        await this.writeMetadataToFile();
        this.observers.forEach(obs => obs.onTopicRenamed(topic, newName));
    }
    async renameChapter(chapter, newName) {
        const topic = chapter.getTopic();
        if (topic === null) {
            return; //TODO: Handle orphan nodes later
        }
        const metadata = await this.getMetadata();
        for (const topicShell of metadata.topics) {
            if (topicShell.id === topic.getId()) {
                for (const chapter of topicShell.chapters) {
                    chapter.displayName = newName;
                    break;
                }
                break;
            }
        }
        await this.writeMetadataToFile();
        this.observers.forEach(obs => obs.onChapterRenamed(chapter, newName));
    }
    async moveChapter(chapter, newTopic) {
        const metadata = await this.getMetadata();
        const oldTopic = chapter.getTopic();
        for (const topicShell of metadata.topics) {
            if (oldTopic !== null && topicShell.id === oldTopic.getId()) {
                topicShell.chapters = topicShell.chapters.filter(c => c.id === chapter.getId());
            }
            else if (topicShell.id === newTopic.getId()) {
                topicShell.chapters.push({
                    id: chapter.getId(),
                    displayName: chapter.getDisplayName(),
                });
            }
        }
        await this.writeMetadataToFile();
        this.observers.forEach(obs => obs.onChapterMoved(chapter, newTopic));
    }
    async newTopic(topic) {
        const metadata = await this.getMetadata();
        if (metadata === null) {
            return;
        }
        metadata.topics.push({
            id: topic.getId(),
            displayName: topic.getDisplayName(),
            chapters: [],
        });
        await this.writeMetadataToFile();
        this.observers.forEach(obs => obs.onTopicCreated(topic));
    }
    async newChapter(chapter, text) {
        const topic = chapter.getTopic();
        if (topic === null) {
            return;
        }
        this.createOrUpdateChapter(chapter, text, true);
        const metadata = await this.getMetadata();
        if (metadata === null) {
            return;
        }
        for (const topicShell of metadata.topics) {
            if (topicShell.id === topic.getId()) {
                topicShell.chapters.push({
                    id: chapter.getId(),
                    displayName: chapter.getDisplayName(),
                });
                break;
            }
        }
        await this.writeMetadataToFile();
        this.observers.forEach(obs => obs.onChapterCreated(chapter));
    }
    async saveChapter(chapter, text) {
        const saveTs = new Date();
        this.createOrUpdateChapter(chapter, text, false);
        this.observers.forEach(obs => obs.onChapterSaved(chapter, saveTs));
    }
    async createOrUpdateChapter(chapter, text, create) {
        const chapterHandle = await this.getChapterFileHandle(chapter, create);
        if (chapterHandle !== null) {
            const chapterWritable = await chapterHandle.createWritable();
            await chapterWritable.write(text);
            await chapterWritable.close();
        }
    }
    async getMetadataFromFile() {
        try {
            const metadataFileHandle = await this.contentRootHandle.getFileHandle('manifest.json', {
                create: false,
            });
            if (!metadataFileHandle) {
                return null;
            }
            const metadataFile = await metadataFileHandle.getFile();
            const metadataText = await metadataFile.text();
            return JSON.parse(metadataText);
        }
        catch (_err) {
            return null;
        }
    }
    async writeMetadataToFile() {
        const metadata = await this.getMetadata();
        const metadataFileHandle = await this.contentRootHandle.getFileHandle('manifest.json', {
            create: true,
        });
        const metadataWritable = await metadataFileHandle.createWritable();
        await metadataWritable.write(JSON.stringify(metadata));
        await metadataWritable.close();
    }
    async getChapterFileHandle(chapter, create) {
        try {
            return this.contentRootHandle.getFileHandle(FileSystemController.getChapterFileName(chapter), {
                create: create,
            });
        }
        catch (_err) {
            return null;
        }
    }
    static getChapterFileName(chapter) {
        return chapter.getId() + '.md';
    }
}
//# sourceMappingURL=fs.js.map