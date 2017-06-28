import { IAnswerItem } from '../';

export interface ICombobox {
    _id: string;
    caption: string;
    items: IAnswerItem[];
}
