import ReactDOM from 'react-dom';
import { ButtonlessForm } from './ButtonlessForm';
import { TopicElement } from './TopicElement';
import React, { createRef } from 'react';
import { computeIfAbsent } from '../lib/utils';
export class ContentExplorer extends React.Component {
    createTopicElemRef;
    topicElementRefs;
    constructor(props) {
        super(props);
        this.createTopicElemRef = createRef();
        this.topicElementRefs = new Map();
        this.state = {
            selectedChapter: null,
            selectedTopic: null,
            isAddingTopic: false,
        };
    }
    componentDidMount() {
        const topicInputCmp = this.createTopicElemRef.current;
        const topicInputElem = ReactDOM.findDOMNode(topicInputCmp);
        if (topicInputElem) {
            topicInputElem.addEventListener('inputProvided', this.newTopicRequested.bind(this));
            topicInputElem.addEventListener('inputCancelled', this.topicCreationCancelled.bind(this));
        }
    }
    componentWillUnmount() {
        const topicInputCmp = this.createTopicElemRef.current;
        const topicInputElem = ReactDOM.findDOMNode(topicInputCmp);
        if (topicInputElem) {
            topicInputElem.removeEventListener('inputProvided', this.newTopicRequested.bind(this));
            topicInputElem.removeEventListener('inputCancelled', this.topicCreationCancelled.bind(this));
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.topics !== this.props.topics ||
            nextState.isAddingTopic !== this.state.isAddingTopic ||
            nextState.selectedTopic !== this.state.selectedTopic ||
            nextState.selectedChapter !== this.state.selectedChapter);
    }
    render() {
        const topicLiElems = this.props.topics.map(topic => (React.createElement(TopicElement, { key: topic.getId(), topic: topic, ref: computeIfAbsent(this.topicElementRefs, topic.getId(), () => createRef()) })));
        return (React.createElement("div", { id: "explorer", className: "left-sidebar" },
            React.createElement("nav", { className: "topmenu" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("button", { className: 'navBtn material-symbols-outlined', onClick: this.createNewTopic.bind(this), title: "Add a new topic" }, "create_new_folder")),
                    this.state.selectedTopic !== null && (React.createElement("li", null,
                        React.createElement("button", { className: 'navBtn material-symbols-outlined', onClick: this.createNewChapter.bind(this), title: "Add a new chapter under the current topic" }, "new_window"))))),
            React.createElement("ul", { id: "explorer-items", className: "tree" },
                topicLiElems,
                React.createElement("li", { style: {
                        display: this.state.isAddingTopic ? 'inline-block' : 'none',
                    } },
                    React.createElement(ButtonlessForm, { promptText: "Enter topic name", ref: this.createTopicElemRef })))));
    }
    markTopicSelected(topic) {
        const currentSelectedTopic = this.state.selectedTopic;
        if (currentSelectedTopic === topic) {
            return;
        }
        if (currentSelectedTopic) {
            const oldSelectedTopicElement = this.topicElementRefs.get(currentSelectedTopic.getId())?.current;
            oldSelectedTopicElement?.markSelected(false);
        }
        this.setState({ selectedTopic: topic }, (() => {
            const selectedTopic = this.state.selectedTopic;
            if (selectedTopic !== null) {
                this.topicElementRefs
                    .get(selectedTopic.getId())
                    ?.current?.markSelected(true);
            }
        }).bind(this));
    }
    markChapterSelected(chapter) {
        const currentSelectedChapter = this.state.selectedChapter;
        if (currentSelectedChapter === chapter) {
            return;
        }
        if (currentSelectedChapter) {
            const topicOfCurrentSelectedChapter = currentSelectedChapter.getTopic();
            if (topicOfCurrentSelectedChapter !== null) {
                this.topicElementRefs
                    .get(topicOfCurrentSelectedChapter.getId())
                    ?.current?.markChapterSelected(currentSelectedChapter, false);
            }
        }
        this.setState({
            selectedChapter: chapter,
            selectedTopic: chapter?.getTopic() || null,
        }, (() => {
            const chapter = this.state.selectedChapter;
            const topic = this.state.selectedTopic;
            if (chapter !== null && topic !== null) {
                this.topicElementRefs
                    .get(topic.getId())
                    ?.current?.markChapterSelected(chapter, true);
            }
        }).bind(this));
    }
    createNewTopic() {
        this.setState({ isAddingTopic: true }, (() => this.createTopicElemRef.current?.focusInput()).bind(this));
    }
    createNewChapter() {
        this.setState({ isAddingTopic: false });
        const selectedTopic = this.state.selectedTopic;
        if (selectedTopic) {
            this.topicElementRefs
                .get(selectedTopic.getId())
                ?.current?.showNewChapterForm();
        }
    }
    topicCreationCancelled() {
        this.setState({ isAddingTopic: false });
    }
    newTopicRequested(e) {
        const name = e.detail;
        if (name === null || name.length === 0) {
            return;
        }
        const myDom = ReactDOM.findDOMNode(this);
        if (this.state.isAddingTopic && myDom) {
            myDom.dispatchEvent(new CustomEvent('newTopicRequested', {
                detail: name,
                bubbles: true,
                cancelable: true,
                composed: false,
            }));
            this.setState({ isAddingTopic: false });
        }
    }
}
//# sourceMappingURL=ContentExplorer.js.map