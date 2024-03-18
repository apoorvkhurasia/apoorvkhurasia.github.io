import React, { createRef } from 'react';
import { ChapterElement } from './ChapterElement';
import { ButtonlessForm } from './ButtonlessForm';
import ReactDOM from 'react-dom';
import { computeIfAbsent } from '../lib/utils';
export class TopicElement extends React.Component {
    createChapterFormCmp;
    chapterElemRefs;
    constructor(topicProps) {
        super(topicProps);
        this.createChapterFormCmp = createRef();
        this.chapterElemRefs = new Map();
        this.state = { isAddingChapter: false, isSelected: false };
    }
    componentDidMount() {
        const topicInputElem = ReactDOM.findDOMNode(this.createChapterFormCmp.current);
        if (topicInputElem) {
            topicInputElem.addEventListener('inputProvided', this.newChapterRequested.bind(this));
            topicInputElem.addEventListener('inputCancelled', this.chapterCreationCancelled.bind(this));
        }
    }
    componentWillUnmount() {
        const topicInputElem = ReactDOM.findDOMNode(this.createChapterFormCmp.current);
        if (topicInputElem) {
            topicInputElem.removeEventListener('inputProvided', this.newChapterRequested.bind(this));
            topicInputElem.removeEventListener('inputCancelled', this.chapterCreationCancelled.bind(this));
        }
    }
    render() {
        const chapterLiElems = this.props.topic
            .getChapters()
            .map(chp => (React.createElement(ChapterElement, { key: chp.getId(), chapter: chp, ref: computeIfAbsent(this.chapterElemRefs, chp.getId(), () => createRef()) })));
        return (React.createElement("li", { className: 'topic' + (this.state.isSelected ? ' selected' : ''), onClick: this.selectTopicRequested.bind(this) },
            React.createElement("details", { open: true, style: { cursor: 'default' } },
                React.createElement("summary", null,
                    React.createElement("div", { className: "topic-nav" }, this.props.topic.getDisplayName()),
                    this.state.isSelected && (React.createElement("button", { className: "explorer-mini-btn material-symbols-outlined", onClick: this.deleteTopicRequested.bind(this) }, "delete"))),
                React.createElement("ul", null,
                    chapterLiElems,
                    React.createElement("li", { style: {
                            display: this.state.isAddingChapter ? 'inline-block' : 'none',
                        } },
                        React.createElement(ButtonlessForm, { promptText: "Enter chapter name", ref: this.createChapterFormCmp }))))));
    }
    showNewChapterForm() {
        this.setState({ isAddingChapter: true }, (() => this.createChapterFormCmp.current?.focusInput()).bind(this));
    }
    markSelected(isSelected) {
        this.setState({ isSelected: isSelected });
        if (!isSelected) {
            this.setState({ isAddingChapter: false });
        }
    }
    markChapterSelected(chapter, isSelected) {
        this.chapterElemRefs
            .get(chapter.getId())
            ?.current?.markSelected(isSelected);
        this.markSelected(isSelected); //Also set topic selection state
    }
    selectTopicRequested() {
        const myDOM = ReactDOM.findDOMNode(this);
        myDOM?.dispatchEvent(new CustomEvent('selectTopicRequested', {
            detail: this.props.topic,
            bubbles: true,
            cancelable: true,
            composed: false,
        }));
    }
    deleteTopicRequested(e) {
        if (!confirm('Are you sure you want to delete topic "' +
            this.props.topic.getDisplayName() +
            '"?')) {
            e.preventDefault();
        }
        else {
            const myDOM = ReactDOM.findDOMNode(this);
            myDOM?.dispatchEvent(new CustomEvent('deleteTopicRequested', {
                detail: this.props.topic,
                bubbles: true,
                cancelable: true,
                composed: false,
            }));
        }
    }
    chapterCreationCancelled() {
        this.setState({ isAddingChapter: false });
    }
    newChapterRequested(e) {
        const name = e.detail;
        if (name === null || name.length === 0) {
            return;
        }
        const myDom = ReactDOM.findDOMNode(this);
        if (this.state.isAddingChapter && myDom) {
            myDom.dispatchEvent(new CustomEvent('newChapterRequested', {
                detail: { chapterName: name, topic: this.props.topic },
                bubbles: true,
                cancelable: true,
                composed: false,
            }));
            this.setState({ isAddingChapter: false });
        }
    }
}
//# sourceMappingURL=TopicElement.js.map