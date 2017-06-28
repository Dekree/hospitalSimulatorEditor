import { IDocItem } from './';

export interface IDoc {
    type: string;
    location: string;
    size: string;
    next: string;

    docs: IDocItem[];

    title?: string;
    text?: string;

    actions?: string[];
}
