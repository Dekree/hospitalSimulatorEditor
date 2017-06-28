import { ICombobox, INextItem } from './';

export interface IMap {
    type: string;
    location: string;
    size: string;
    next: { [ name: string ]: INextItem };

    items: ICombobox[];

    image?: string;
    title?: string;
    text?: string;
}
