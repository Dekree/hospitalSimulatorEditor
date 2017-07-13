import { IDocItem, IAnswerItem, INextItem } from './';

export interface IDocSingle {
    _id: string;

    type: string;
    location: string;
    size: string;
    next: { [ name: string ]: INextItem };

    docs: IDocItem[];
    items: IAnswerItem[];

    title?: string;
    text?: string;
}
