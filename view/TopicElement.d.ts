import React from 'react';
import { Topic } from '../model/model';
export interface TopicProps {
    topic: Topic;
}
export interface TopicElementState {
    isAddingChapter: boolean;
}
export declare class TopicElement extends React.Component<TopicProps, TopicElementState> {
    private createChapterFormCmp;
    constructor(topicProps: TopicProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    showNewChapterForm(): void;
    private selectTopic;
    private chapterCreationCancelled;
    private newChapterRequested;
}
