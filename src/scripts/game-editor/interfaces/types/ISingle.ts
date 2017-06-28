import { IAnswerItem, INextItem } from './';

export interface ISingle {
    type: string;
    location: string;
    size: string;
    next: { [ name: string ]: INextItem };

    items: IAnswerItem[];

    image?: string;
    title?: string;
    text?: string;
}
