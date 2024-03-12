import { Chapter, Topic } from '../model/model';
import { ContentController, ContentObserver, StoreCreationOptions } from './contentcontroller';
export declare class FileSystemController implements ContentController {
    private contentRootHandle;
    private observers;
    private metadata;
    constructor(contentRootHandle: FileSystemDirectoryHandle);
    private getMetadata;
    initialiseNewStore(options: StoreCreationOptions): Promise<void>;
    addObserver(obs: ContentObserver): void;
    removeObserver(obs: ContentObserver): void;
    getTopics(): Promise<Topic[]>;
    getChapterText(chapter: Chapter): Promise<string>;
    deleteTopic(topic: Topic): Promise<void>;
    deleteChapter(chapter: Chapter): Promise<void>;
    renameTopic(topic: Topic, newName: string): Promise<void>;
    renameChapter(chapter: Chapter, newName: string): Promise<void>;
    moveChapter(chapter: Chapter, newTopic: Topic): Promise<void>;
    newTopic(topic: Topic): Promise<void>;
    newChapter(chapter: Chapter, text: string): Promise<void>;
    saveChapter(chapter: Chapter, text: string): Promise<void>;
    private createOrUpdateChapter;
    private getMetadataFromFile;
    private writeMetadataToFile;
    private getChapterFileHandle;
}
