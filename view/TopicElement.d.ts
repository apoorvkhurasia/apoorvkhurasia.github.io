import React from 'react';
import { Chapter, Topic } from '../model/model';
export interface TopicProps {
    topic: Topic;
}
export interface TopicElementState {
    isAddingChapter: boolean;
    isSelected: boolean;
}
export declare class TopicElement extends React.Component<TopicProps, TopicElementState> {
    private createChapterFormCmp;
    private chapterElemRefs;
    constructor(topicProps: TopicProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    showNewChapterForm(): void;
    markSelected(isSelected: boolean): void;
    markChapterSelected(chapter: Chapter, isSelected: boolean): void;
    private selectTopicRequested;
    private deleteTopicRequested;
    private chapterCreationCancelled;
    private newChapterRequested;
}
