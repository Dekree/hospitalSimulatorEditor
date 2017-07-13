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
    IYesno,
    IStep,
    IQuest
} from '../interfaces';

export class Step implements IStep {

    _id: string;

    quest: IQuest;

    private metadata: IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno;

    constructor( _id: string, quest: IQuest, metadata: IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno ) {
        this._id = _id;
        this.quest = quest;

        delete metadata._id;

        this.setMetadata( metadata );
    }

    getMetadata(): IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno {
        return this.metadata;
    }

    setMetadata( metadata: IDialog|IDoc|IDocCalc|IDocMulti|IDocSingle|IExclamation|IFolder|IInfo|IMap|IMulti|ISingle|IYesno ): void {
        this.metadata = metadata;
    }

}
