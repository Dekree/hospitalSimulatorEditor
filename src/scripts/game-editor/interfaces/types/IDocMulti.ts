import { IDocItem, IAnswerItem, INextItem } from './';

export interface IDocMulti {
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
