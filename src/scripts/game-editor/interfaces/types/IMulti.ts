import { IAnswerItem, INextItem } from './';

export interface IMulti {
    _id: string;

    type: string;
    location: string;
    size: string;
    next: { [ name: string ]: INextItem };

    items: IAnswerItem[];

    image?: string;
    title?: string;
    text?: string;
}
