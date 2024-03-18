import showdown from 'showdown';
import React, { createRef } from 'react';
export class ContentViewer extends React.Component {
    converter = new showdown.Converter({
        metadata: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        tables: true,
        strikethrough: true,
        tasklists: true,
        smoothLivePreview: true,
        smartIndentationFix: false,
        requireSpaceBeforeHeadingText: true,
        openLinksInNewWindow: true,
        ellipsis: true,
        simpleLineBreaks: true,
    });
    editorRef;
    previewRef;
    constructor(props) {
        super(props);
        this.editorRef = createRef();
        this.previewRef = createRef();
        this.state = {
            isInitialising: true,
            selectedChapter: null,
            rawMarkdownText: '',
            parsedHTML: '<div></div>',
        };
    }
    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if (prevProps.previewVisible !== this.props.previewVisible) {
            this.update(this.state.rawMarkdownText);
        }
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("textarea", { id: "markdownInput", ref: this.editorRef, style: {
                    display: this.state.selectedChapter !== null && this.props.editorVisible
                        ? 'block'
                        : 'none',
                }, className: this.props.previewVisible ? 'half-editor' : 'full-editor', onChange: this.onMarkdownChange.bind(this), value: this.state.rawMarkdownText, placeholder: 'Type in markdown syntax here. LaTeX is not supported yet.' }),
            React.createElement("div", { id: "preview", ref: this.previewRef, className: this.props.editorVisible ? 'half-preview' : 'full-preview', style: this.props.previewVisible ? { display: 'block' } : { display: 'none' }, dangerouslySetInnerHTML: { __html: this.state.parsedHTML } })));
    }
    getSelectedChapter() {
        return this.state.selectedChapter;
    }
    display(chapter, rawMarkdownText) {
        //New chapter
        this.setState({ isInitialising: true, selectedChapter: chapter }, () => {
            this.update(rawMarkdownText);
            this.setState({ isInitialising: false });
            const preview = this.previewRef.current;
            if (preview) {
                preview.scrollTop = 0;
            }
            const editor = this.editorRef.current;
            if (editor) {
                editor.scrollTop = 0;
            }
        });
    }
    async onMarkdownChange(e) {
        this.update(e.target.value);
    }
    update(rawText) {
        const editor = this.editorRef.current;
        if (!this.state.isInitialising && editor) {
            editor.dispatchEvent(new CustomEvent('chapterContentChanged', {
                detail: {
                    chapter: this.state.selectedChapter,
                    rawMarkdownText: rawText,
                },
                bubbles: true,
                cancelable: false,
                composed: false,
            }));
        }
        if (this.props.previewVisible) {
            const html = this.converter.makeHtml(rawText);
            this.setState({
                rawMarkdownText: rawText,
                parsedHTML: html,
            });
        }
        else {
            this.setState({
                rawMarkdownText: rawText,
            });
        }
    }
}
//# sourceMappingURL=ContentViewer.js.map