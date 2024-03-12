import React from 'react';
import { Chapter } from '../model/model';
export interface ChapterProps {
    chapter: Chapter;
}
export interface ChapterState {
    editingName: boolean;
    newChapterName: string;
    chapter: Chapter;
}
export type ChapterRenameArgs = {
    chapter: Chapter;
    newName: string;
};
export declare class ChapterElement extends React.Component<ChapterProps, ChapterState> {
    private liRef;
    private editorRef;
    constructor(chapterProps: ChapterProps);
    render(): React.JSX.Element;
    private showEditor;
    private hideEditor;
    private processKeyboardInput;
    private loadChapter;
    private renameChapter;
}
