export interface IDialog {
    type: string;
    location: string;
    size: string;
    next: string;

    left: {
        image: string;
        text: string;
    };

    right: {
        image: string;
        text: string;
    };

    actions?: string[];
}
