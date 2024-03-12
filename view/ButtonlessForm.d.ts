import React from 'react';
export interface ButtonlessFormProps {
    promptText: string;
}
export declare class ButtonlessForm extends React.Component<ButtonlessFormProps, {}> {
    private inputRef;
    constructor(props: ButtonlessFormProps);
    componentDidMount(): void;
    componentDidUnmount(): void;
    render(): React.JSX.Element;
    focusInput(): void;
}
