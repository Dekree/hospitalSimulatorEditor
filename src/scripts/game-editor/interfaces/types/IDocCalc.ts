import { IDocItem, IDocCalcItem, INextItem } from './';

export interface IDocCalc {
    type: string;
    location: string;
    size: string;
    next: { [ name: string ]: INextItem };

    docs: IDocItem[];
    items: IDocCalcItem[];

    title?: string;
    text?: string;
}
