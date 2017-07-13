export interface IInfo {
    _id: string;

    type: string;
    location: string;
    size: string;
    next: string;

    image?: string;
    title?: string;
    text?: string;

    actions?: string[];
}
