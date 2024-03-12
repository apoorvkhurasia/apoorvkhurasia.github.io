import React from 'react';
import { Chapter, Topic } from '../model/model';
import { ContentController, ContentObserver } from '../controller/contentcontroller';
export interface AppState {
    contentController: ContentController | null;
    askStoreName: boolean;
    topics: Topic[];
    selectedTopic: Topic | null;
    selectedChapter: Chapter | null;
    rawMarkdownText: string;
    caretPos: number;
    editorVisible: boolean;
    previewVisible: boolean;
    lastSaveTs: Date | null;
}
export declare class App extends React.Component<{}, AppState> implements ContentObserver {
    private unsavedChapters;
    private storeNameInput;
    private static readonly SAVE_INTERVAL;
    constructor(props: {});
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    private togglePreview;
    private toggleEditorVisibility;
    private createStore;
    private cancelCreatingStore;
    private openStore;
    private createOrOpenStore;
    private loadChapter;
    private chapterContentChanged;
    private saveUnsavedChapters;
    private createNewTopic;
    private createNewChapter;
    private renameChapterRequseted;
    onTopicCreated(topic: Topic): void;
    onTopicRenamed(_topic: Topic, _newName: string): void;
    onTopicDeleted(topic: Topic): void;
    onChapterCreated(_chapter: Chapter): void;
    onChapterMoved(_chapter: Chapter, _newTopic: Topic): void;
    onChapterRenamed(chapter: Chapter, newName: string): void;
    onChapterDeleted(_chapter: Chapter): void;
}
