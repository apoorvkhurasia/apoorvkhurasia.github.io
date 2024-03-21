import React from 'react';
import { Chapter } from '../model/model';
export interface ChapterProps {
    chapter: Chapter;
}
export interface ChapterState {
    editingName: boolean;
    newChapterName: string;
    isSelected: boolean;
}
export type ChapterRenameArgs = {
    chapter: Chapter;
    newName: string;
};
export declare class ChapterElement extends React.Component<ChapterProps, ChapterState> {
    private editorRef;
    constructor(chapterProps: ChapterProps);
    render(): React.JSX.Element;
    markSelected(isSelected: boolean): void;
    private showEditor;
    private hideEditor;
    private processKeyboardInput;
    private selectChapterRequested;
    private renameChapter;
    private deleteChapterRequested;
}
