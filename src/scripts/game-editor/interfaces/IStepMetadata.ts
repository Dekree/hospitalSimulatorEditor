export interface IStepMetadata {
    location: string;
    type: string;
    size: string;
    next: any;

    actions?: string[];

    // exclamation
    target?: string;

    // single
    image?: string;
    title?: string;
    text?: string;
    items?: any[];
    answers?: any;

    // dialog
    left?: any;
    right?: any;

    // map
    list?: any[];

    // doc
    docs?: any[];
}
