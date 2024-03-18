import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
export class ChapterElement extends React.Component {
    editorRef;
    constructor(chapterProps) {
        super(chapterProps);
        this.editorRef = createRef();
        this.state = {
            isSelected: false,
            editingName: false,
            newChapterName: chapterProps.chapter.getDisplayName(),
        };
    }
    render() {
        return (React.createElement("li", { className: 'chapter' + (this.state.isSelected ? ' selected' : ''), onClick: this.loadChapter.bind(this), onDoubleClick: this.showEditor.bind(this) },
            this.state.editingName ? (React.createElement("form", { style: { display: 'inline' }, onSubmit: e => {
                    e.preventDefault();
                    this.renameChapter(this.state.newChapterName);
                    this.hideEditor();
                }, onAbort: e => {
                    e.preventDefault();
                    this.setState({
                        newChapterName: this.props.chapter.getDisplayName(), //Restore
                        editingName: false,
                    });
                } },
                React.createElement("input", { ref: this.editorRef, className: "mini-editor", onKeyUp: this.processKeyboardInput.bind(this), defaultValue: this.props.chapter.getDisplayName(), onChange: e => this.setState({ newChapterName: e.target.value }) }),
                React.createElement("input", { type: "submit", style: { display: 'none' }, tabIndex: -1 }),
                React.createElement("input", { type: "reset", style: { display: 'none' }, tabIndex: -1 }))) : (React.createElement("div", { className: "chapter-nav" }, this.props.chapter.getDisplayName())),
            this.state.isSelected && !this.state.editingName && (React.createElement("button", { className: "explorer-mini-btn material-symbols-outlined", onClick: this.deleteChapterRequested.bind(this) }, "delete"))));
    }
    markSelected(isSelected) {
        this.setState({ isSelected: isSelected });
        if (!isSelected) {
            this.setState({ editingName: false });
        }
    }
    showEditor(e) {
        this.setState({ editingName: true }, (() => {
            const editor = this.editorRef.current;
            if (editor) {
                editor.focus();
                editor.setSelectionRange(0, editor.value.length);
            }
        }).bind(this));
        e.stopPropagation();
    }
    hideEditor() {
        this.setState({ editingName: false, newChapterName: '' });
    }
    processKeyboardInput(e) {
        if (e.key === 'Escape' || e.key === 'Enter') {
            this.hideEditor();
        }
    }
    loadChapter() {
        const me = ReactDOM.findDOMNode(this);
        me?.dispatchEvent(new CustomEvent('selectChapterRequested', {
            detail: this.props.chapter,
            bubbles: true,
            cancelable: false,
            composed: false,
        }));
    }
    renameChapter(newName) {
        const me = ReactDOM.findDOMNode(this);
        me?.dispatchEvent(new CustomEvent('renameChapterRequseted', {
            detail: { chapter: this.props.chapter, newName: newName },
            bubbles: true,
            cancelable: false,
            composed: false,
        }));
    }
    deleteChapterRequested(e) {
        if (!confirm('Are you sure you want to delete chapter " ' +
            this.props.chapter.getDisplayName() +
            '"?')) {
            e.preventDefault();
        }
        else {
            const me = ReactDOM.findDOMNode(this);
            me?.dispatchEvent(new CustomEvent('deleteChapterRequested', {
                detail: this.props.chapter,
                bubbles: true,
                cancelable: false,
                composed: false,
            }));
        }
    }
}
//# sourceMappingURL=ChapterElement.js.map