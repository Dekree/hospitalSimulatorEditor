import { IFolderItem } from './';

export interface IFolder {
    _id: string;

    type: string;
    location: string;
    size: string;
    next: string;

    items: IFolderItem[];

    actions?: string[];
}
