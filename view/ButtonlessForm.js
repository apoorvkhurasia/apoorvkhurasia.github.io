import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
export class ButtonlessForm extends React.Component {
    inputRef;
    constructor(props) {
        super(props);
        this.inputRef = createRef();
    }
    componentDidMount() {
        const me = ReactDOM.findDOMNode(this);
        if (me) {
            me.addEventListener('focus', this.focusInput.bind(this));
        }
    }
    componentDidUnmount() {
        const me = ReactDOM.findDOMNode(this);
        if (me) {
            me.removeEventListener('focus', this.focusInput.bind(this));
        }
    }
    render() {
        return (React.createElement("form", { onSubmit: e => {
                e.preventDefault(); //To prevent reload
                const inputElem = this.inputRef.current;
                if (inputElem) {
                    const name = inputElem.value;
                    if (name && name.trim().length > 0) {
                        e.currentTarget.dispatchEvent(new CustomEvent('inputProvided', {
                            detail: name,
                            bubbles: true,
                            cancelable: true,
                            composed: false,
                        }));
                    }
                    inputElem.value = '';
                }
            }, onAbort: e => {
                e.preventDefault(); //To prevent reload
                e.currentTarget.dispatchEvent(new Event('inputCancelled', {
                    bubbles: true,
                    cancelable: true,
                    composed: false,
                }));
            } },
            React.createElement("input", { className: "mini-editor", tabIndex: 0, placeholder: this.props.promptText, onKeyUp: (e) => {
                    if (e.key === 'Escape') {
                        e.currentTarget.dispatchEvent(new Event('inputCancelled', {
                            bubbles: true,
                            cancelable: true,
                            composed: false,
                        }));
                    }
                }, ref: this.inputRef }),
            React.createElement("input", { type: "submit", style: { display: 'none' }, tabIndex: -1 }),
            React.createElement("input", { type: "reset", style: { display: 'none' }, tabIndex: -1 })));
    }
    focusInput() {
        this.inputRef.current?.focus();
    }
}
//# sourceMappingURL=ButtonlessForm.js.map