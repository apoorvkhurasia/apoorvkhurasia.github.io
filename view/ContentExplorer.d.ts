import { Topic } from '../model/model';
import React from 'react';
export type ChapterCreationArgs = {
    topic: Topic;
    chapterName: string;
};
export interface ExplorerProps {
    topics: Topic[];
}
export interface ExplorerState {
    selectedChapterElement: HTMLLIElement | null;
    selectedTopicElement: HTMLLIElement | null;
    selectedTopic: Topic | null;
    isAddingTopic: boolean;
}
export declare class ContentExplorer extends React.Component<ExplorerProps, ExplorerState> {
    private explorerRef;
    private createTopicElemRef;
    private topicElementRefs;
    constructor(props: ExplorerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: Readonly<ExplorerProps>, nextState: Readonly<ExplorerState>): boolean;
    render(): React.JSX.Element;
    private createNewTopic;
    private createNewChapter;
    private chapterSelected;
    private topicSelected;
    private topicCreationCancelled;
    private newTopicRequested;
}
