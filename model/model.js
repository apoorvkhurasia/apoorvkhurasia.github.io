import { del } from '../lib/utils';
export class Topic {
    id;
    displayName;
    chapters = [];
    constructor(id, displayName) {
        this.id = id;
        this.displayName = displayName;
    }
    getId() {
        return this.id;
    }
    getDisplayName() {
        return this.displayName;
    }
    setDisplayName(newName) {
        this.displayName = newName;
    }
    addChapter(chapter) {
        if (chapter.getTopic() === this) {
            return;
        }
        const oldTopic = chapter.getTopic();
        chapter.__dangerouslySetBacklink(this);
        this.chapters.push(chapter);
        if (oldTopic !== null) {
            del(oldTopic.chapters, chapter);
        }
    }
    removeChapter(chapter) {
        if (del(this.chapters, chapter)) {
            chapter.__dangerouslySetBacklink(null);
        }
    }
    getChapters() {
        return this.chapters;
    }
}
export class Chapter {
    id;
    displayName;
    topic = null; //backlink
    constructor(id, displayName) {
        this.id = id;
        this.displayName = displayName;
    }
    getId() {
        return this.id;
    }
    getDisplayName() {
        return this.displayName;
    }
    setDisplayName(newName) {
        this.displayName = newName;
    }
    getTopic() {
        return this.topic;
    }
    __dangerouslySetBacklink(topic) {
        this.topic = topic;
    }
}
//# sourceMappingURL=model.js.map