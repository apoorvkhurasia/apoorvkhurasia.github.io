import { Chapter, Topic } from '../model/model';
import React from 'react';
export type ChapterCreationArgs = {
    topic: Topic;
    chapterName: string;
};
export interface ExplorerProps {
    topics: Topic[];
}
export interface ExplorerState {
    selectedChapter: Chapter | null;
    selectedTopic: Topic | null;
    isAddingTopic: boolean;
}
export declare class ContentExplorer extends React.Component<ExplorerProps, ExplorerState> {
    private createTopicElemRef;
    private topicElementRefs;
    constructor(props: ExplorerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: Readonly<ExplorerProps>, nextState: Readonly<ExplorerState>): boolean;
    render(): React.JSX.Element;
    markTopicSelected(topic: Topic | null): void;
    markChapterSelected(chapter: Chapter | null): void;
    private createNewTopic;
    private createNewChapter;
    private topicCreationCancelled;
    private newTopicRequested;
}
