export declare class Topic {
    private id;
    private displayName;
    private chapters;
    constructor(id: string, displayName: string);
    getId(): string;
    getDisplayName(): string;
    setDisplayName(newName: string): void;
    addChapter(chapter: Chapter): void;
    removeChapter(chapter: Chapter): void;
    getChapters(): Array<Chapter>;
}
export declare class Chapter {
    private id;
    private displayName;
    private topic;
    constructor(id: string, displayName: string);
    getId(): string;
    getDisplayName(): string;
    setDisplayName(newName: string): void;
    getTopic(): Topic | null;
    __dangerouslySetBacklink(topic: Topic | null): void;
}
