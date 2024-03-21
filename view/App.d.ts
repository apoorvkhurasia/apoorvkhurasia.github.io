import React from 'react';
import { Chapter, Topic } from '../model/model';
import { ContentController, ContentObserver } from '../controller/contentcontroller';
export interface AppState {
    contentController: ContentController | null;
    askStoreName: boolean;
    topics: Topic[];
    caretPos: number;
    editorVisible: boolean;
    previewVisible: boolean;
    lastSaveTs: Date | null;
    showContentControls: boolean;
    darkMode: boolean;
}
export declare class App extends React.Component<{}, AppState> implements ContentObserver {
    private unsavedChapters;
    private storeNameInput;
    private contentExplorerRef;
    private contentViewerRef;
    private saveTimer;
    private static readonly SAVE_INTERVAL;
    constructor(props: {});
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    private togglePreview;
    private toggleEditorVisibility;
    private toggleLightMode;
    private setThemeFromState;
    private createStore;
    private cancelCreatingStore;
    private openStore;
    private createOrOpenStore;
    private onSelectTopicRequested;
    private onSelectChapterRequested;
    private onChapterContentChanged;
    private saveUnsavedChapters;
    private onNewTopicRequested;
    private onDeleteTopicRequested;
    private onDeleteChapterRequested;
    private onNewChapterRequested;
    private onRenameChapterRequested;
    private selectTopic;
    private selectChapter;
    onTopicCreated(topic: Topic): void;
    onTopicRenamed(topic: Topic, newName: string): void;
    onTopicDeleted(topic: Topic): void;
    onChapterCreated(chapter: Chapter): void;
    onChapterMoved(chapter: Chapter, newTopic: Topic): void;
    onChapterRenamed(chapter: Chapter, newName: string): void;
    onChapterSaved(chapter: Chapter, saveTs: Date): void;
    onChapterDeleted(chapter: Chapter): void;
}
