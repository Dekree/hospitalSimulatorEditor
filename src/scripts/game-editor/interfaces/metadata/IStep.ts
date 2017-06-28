import {
    IDialog,
    IDoc,
    IDocCalc,
    IDocMulti,
    IDocSingle,
    IExclamation,
    IFolder,
    IInfo,
    IMap,
    IMulti,
    ISingle,
    IYesno
} from '../types';
import { IQuest } from './IQuest';

export interface IStep {
    _id: string;
    metadata: IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno;

    quest: IQuest;

    getMetadata(): IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno;

    setMetadata( metadata: IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno ): void;
}
