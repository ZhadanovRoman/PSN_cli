declare module 'react-number-format' {
    import { Component } from 'react';

    interface NumberFormatValues {
        formattedValue: string;
        value: string;
        floatValue: number;
    }

    interface NumberFormatProps {
        format: string;
        mask?: string | Array<string>;
        onValueChange?: (values: NumberFormatValues) => void;
        placeholder?: string;
        className?: string;
        value?: string;
        defaultValue?: string;
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }

    export default class NumberFormat extends Component<NumberFormatProps> {}
}