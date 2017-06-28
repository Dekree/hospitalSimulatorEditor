import { IFolderItem } from './';

export interface IFolder {
    type: string;
    location: string;
    size: string;
    next: string;

    items: IFolderItem[];

    actions?: string[];
}
