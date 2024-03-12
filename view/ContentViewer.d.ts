import React from 'react';
import { Chapter } from '../model/model';
export interface ContentViewerProps {
    selectedChapter: Chapter | null;
    originalRawMarkdownText: string;
    caretPos: number;
    editorVisible: boolean;
    previewVisible: boolean;
}
export interface ChapterChangeArgs {
    chapter: Chapter;
    rawMarkdownText: string;
}
export interface ContentViewerState {
    isInitialising: boolean;
    rawMarkdownText: string;
    parsedHTML: string;
}
export declare class ContentViewer extends React.Component<ContentViewerProps, ContentViewerState> {
    private converter;
    private editorRef;
    private previewRef;
    constructor(props: ContentViewerProps);
    componentDidUpdate(prevProps: Readonly<ContentViewerProps>, _prevState: Readonly<ContentViewerState>, _snapshot?: unknown): void;
    render(): React.JSX.Element;
    private onMarkdownChange;
    private update;
}
