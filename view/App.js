import React, { createRef } from 'react';
import { ContentViewer } from './ContentViewer';
import { Chapter, Topic } from '../model/model';
import { FileSystemController } from '../controller/fs';
import { ContentExplorer } from './ContentExplorer';
import { ButtonlessForm } from './ButtonlessForm';
import ReactDOM from 'react-dom';
import { pop } from '../lib/utils';
export class App extends React.Component {
    unsavedChapters = new Map();
    storeNameInput;
    contentExplorerRef;
    contentViewerRef;
    static SAVE_INTERVAL = 5000;
    constructor(props) {
        super(props);
        this.storeNameInput = createRef();
        this.contentExplorerRef = createRef();
        this.contentViewerRef = createRef();
        this.state = {
            contentController: null,
            askStoreName: false,
            topics: [],
            caretPos: 0,
            editorVisible: true,
            previewVisible: true,
            lastSaveTs: null,
            showContentControls: false,
        };
    }
    componentDidMount() {
        document.addEventListener('selectChapterRequested', this.onSelectChapterRequested.bind(this));
        document.addEventListener('selectTopicRequested', this.onSelectTopicRequested.bind(this));
        document.addEventListener('newTopicRequested', this.onNewTopicRequested.bind(this));
        document.addEventListener('newChapterRequested', this.onNewChapterRequested.bind(this));
        document.addEventListener('chapterContentChanged', this.onChapterContentChanged.bind(this));
        document.addEventListener('renameChapterRequseted', this.onRenameChapterRequested.bind(this));
        document.addEventListener('deleteTopicRequested', this.onDeleteTopicRequested.bind(this));
        document.addEventListener('deleteChapterRequested', this.onDeleteChapterRequested.bind(this));
        const topicInputElem = ReactDOM.findDOMNode(this.storeNameInput.current);
        if (topicInputElem) {
            topicInputElem.addEventListener('inputProvided', this.createStore.bind(this));
            topicInputElem.addEventListener('inputCancelled', this.cancelCreatingStore.bind(this));
        }
    }
    componentWillUnmount() {
        this.saveUnsavedChapters().then(res => clearTimeout(res));
        document.removeEventListener('selectChapterRequested', this.onSelectChapterRequested.bind(this));
        document.removeEventListener('selectTopicRequested', this.onSelectTopicRequested.bind(this));
        document.removeEventListener('newTopicRequested', this.onNewTopicRequested.bind(this));
        document.removeEventListener('newChapterRequested', this.onNewChapterRequested.bind(this));
        document.removeEventListener('deleteTopicRequested', this.onDeleteTopicRequested.bind(this));
        document.removeEventListener('deleteChapterRequested', this.onDeleteChapterRequested.bind(this));
        document.removeEventListener('chapterContentChanged', this.onChapterContentChanged.bind(this));
        document.removeEventListener('renameChapterRequseted', this.onRenameChapterRequested.bind(this));
        const topicInputElem = ReactDOM.findDOMNode(this.storeNameInput.current);
        if (topicInputElem) {
            topicInputElem.removeEventListener('inputProvided', this.createStore.bind(this));
            topicInputElem.removeEventListener('inputCancelled', this.cancelCreatingStore.bind(this));
        }
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("nav", { className: "topmenu", style: { width: '100%' } },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("button", { className: "navBtn", title: "New Store", onClick: (() => {
                                this.setState({ askStoreName: true }, () => {
                                    this.storeNameInput.current?.focusInput();
                                });
                            }).bind(this) }, "New Store")),
                    React.createElement("li", { style: {
                            display: this.state.askStoreName ? 'inline-block' : 'none',
                        } },
                        React.createElement(ButtonlessForm, { promptText: "Enter store name", ref: this.storeNameInput })),
                    React.createElement("li", null,
                        React.createElement("button", { className: "navBtn", title: "Open Store", onClick: this.openStore.bind(this) }, "Open Store")),
                    React.createElement("li", { style: {
                            display: this.state.showContentControls
                                ? 'inline-block'
                                : 'none',
                        } },
                        React.createElement("button", { className: "navBtn", title: this.state.editorVisible ? 'Hide Editor' : 'Show Editor', onClick: this.toggleEditorVisibility.bind(this) }, this.state.editorVisible ? 'Hide Editor' : 'Show Editor')),
                    React.createElement("li", { style: {
                            display: this.state.showContentControls
                                ? 'inline-block'
                                : 'none',
                        } },
                        React.createElement("button", { className: "navBtn", title: this.state.previewVisible ? 'Hide Preview' : 'Show Preview', onClick: this.togglePreview.bind(this) }, this.state.previewVisible ? 'Hide Preview' : 'Show Preview')))),
            this.state.contentController ? (React.createElement(React.Fragment, null,
                React.createElement(ContentExplorer, { topics: this.state.topics, ref: this.contentExplorerRef }),
                React.createElement(ContentViewer, { caretPos: this.state.caretPos, editorVisible: this.state.editorVisible, previewVisible: this.state.previewVisible, ref: this.contentViewerRef }))) : (React.createElement("div", { className: "init-message-screen" },
                React.createElement("div", { className: "init-message" },
                    "Create a new store or Open a new store to start using the app.",
                    ' ',
                    React.createElement("br", null),
                    "A store is a directory where your notes are stored."))),
            React.createElement("div", { className: "footer" },
                this.state.lastSaveTs && (React.createElement("label", null,
                    "Autosaved: ",
                    this.state.lastSaveTs.toLocaleString())),
                React.createElement("label", { style: { float: 'right' } }, "md"))));
    }
    togglePreview() {
        this.setState({ previewVisible: !this.state.previewVisible });
    }
    toggleEditorVisibility() {
        this.setState({ editorVisible: !this.state.editorVisible });
    }
    async createStore(e) {
        await this.createOrOpenStore({ storeName: e.detail.trim() });
        this.setState({ askStoreName: false });
    }
    cancelCreatingStore() {
        this.setState({ askStoreName: false });
    }
    async openStore() {
        await this.createOrOpenStore(null);
    }
    async createOrOpenStore(options) {
        clearTimeout(await this.saveUnsavedChapters());
        this.state.contentController?.removeObserver(this);
        try {
            const storeDirectoryHandle = await window.showDirectoryPicker();
            if (storeDirectoryHandle) {
                const contentController = new FileSystemController(storeDirectoryHandle);
                if (options) {
                    contentController.initialiseNewStore(options);
                }
                const newTopics = await contentController.getTopics();
                this.setState({
                    contentController: contentController,
                    topics: newTopics,
                });
                contentController.addObserver(this);
            }
        }
        catch (_err) {
            this.state.contentController?.addObserver(this);
        }
        finally {
            await this.saveUnsavedChapters(); //restart the save timer
        }
    }
    onSelectTopicRequested(e) {
        this.selectTopic(e.detail);
    }
    async onSelectChapterRequested(e) {
        await this.selectChapter(e.detail);
    }
    onChapterContentChanged(e) {
        this.unsavedChapters.set(e.detail.chapter.getId(), e.detail);
    }
    async saveUnsavedChapters() {
        const controller = this.state.contentController;
        if (controller) {
            let change = pop(this.unsavedChapters);
            while (change) {
                await controller.saveChapter(change.chapter, change.rawMarkdownText);
                change = pop(this.unsavedChapters);
            }
        }
        return setTimeout(this.saveUnsavedChapters.bind(this), App.SAVE_INTERVAL);
    }
    async onNewTopicRequested(e) {
        const controller = this.state.contentController;
        if (controller) {
            const topic = new Topic(crypto.randomUUID(), e.detail);
            await controller.newTopic(topic);
        }
    }
    async onDeleteTopicRequested(e) {
        const controller = this.state.contentController;
        if (controller) {
            await controller.deleteTopic(e.detail);
        }
    }
    async onDeleteChapterRequested(e) {
        const controller = this.state.contentController;
        if (controller) {
            await controller.deleteChapter(e.detail);
        }
    }
    async onNewChapterRequested(e) {
        const controller = this.state.contentController;
        const topic = e.detail.topic;
        if (controller && topic !== null) {
            const chapter = new Chapter(crypto.randomUUID(), e.detail.chapterName);
            topic.addChapter(chapter);
            await controller.newChapter(chapter, '');
        }
    }
    async onRenameChapterRequested(e) {
        const controller = this.state.contentController;
        const chapter = e.detail.chapter;
        if (controller && chapter) {
            await controller.renameChapter(chapter, e.detail.newName);
        }
    }
    selectTopic(topic) {
        this.contentExplorerRef.current?.markTopicSelected(topic);
        if (!topic ||
            this.contentViewerRef.current?.getSelectedChapter()?.getTopic() !== topic) {
            this.selectChapter(null);
        }
        this.contentExplorerRef.current?.markTopicSelected(topic);
    }
    async selectChapter(chapter) {
        const controller = this.state.contentController;
        if (controller && chapter !== null) {
            const rawText = await controller.getChapterText(chapter);
            this.contentExplorerRef.current?.markChapterSelected(chapter);
            this.contentViewerRef.current?.display(chapter, rawText);
            this.setState({ showContentControls: true, lastSaveTs: null });
        }
        else {
            this.contentExplorerRef.current?.markChapterSelected(null);
            this.contentViewerRef.current?.display(null, '');
            this.setState({ showContentControls: false, lastSaveTs: null });
        }
    }
    onTopicCreated(topic) {
        this.setState({
            topics: this.state.topics.concat(topic),
        }, (() => this.selectTopic(topic)).bind(this));
    }
    onTopicRenamed(topic, newName) {
        topic.setDisplayName(newName);
        this.setState({ topics: this.state.topics.map(x => x) });
    }
    onTopicDeleted(topic) {
        this.setState({
            topics: this.state.topics.filter(t => t.getId() !== topic.getId()),
        }, (() => this.selectTopic(null)).bind(this));
    }
    onChapterCreated(chapter) {
        this.setState({ topics: this.state.topics.map(x => x) }, (async () => await this.selectChapter(chapter)).bind(this));
    }
    onChapterMoved(chapter, newTopic) {
        newTopic.addChapter(chapter);
        this.setState({ topics: this.state.topics.map(x => x) });
    }
    onChapterRenamed(chapter, newName) {
        chapter.setDisplayName(newName);
        this.setState({ topics: this.state.topics.map(x => x) });
    }
    onChapterSaved(chapter, saveTs) {
        if (chapter === this.contentViewerRef.current?.getSelectedChapter()) {
            this.setState({ lastSaveTs: saveTs });
        }
    }
    onChapterDeleted(chapter) {
        chapter.getTopic()?.removeChapter(chapter);
        this.setState({ topics: this.state.topics.map(x => x) }, (async () => await this.selectChapter(null)).bind(this));
    }
}
//# sourceMappingURL=App.js.map