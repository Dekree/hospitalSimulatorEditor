import { IGame, IRubric, IQuest, IStep } from '../interfaces';

export class Rubric implements IRubric {

    _id: string;
    name: string;

    game: IGame;

    private quests: IQuest[];

    constructor( _id: string, name: string, game: IGame, quests?: IQuest[] ) {
        this._id = _id;
        this.name = name;
        this.game = game;
        this.setQuests( quests );
    }

    private getQuestById( questId: string ): IQuest {
        for( let i: number = 0, ii: number = this.quests.length; i < ii; i += 1 ) {
            if( this.quests[ i ]._id === questId ) {
                return this.quests[ i ];
            }
        }

        return null;
    }

    addQuest( quest: IQuest ): void {
        this.quests.push( quest );
    }

    updateQuest( questId: string, questMetadata: IQuest ): boolean {
        let quest: IQuest = this.getQuestById( questId );
        let stepsMetadata: IStep[] = questMetadata.getAllSteps();

        if( typeof questMetadata.name !== 'undefined' ) {
            quest.name = questMetadata.name;
            quest.setSteps( stepsMetadata );

            return true;
        }

        return false;
    }

    deleteQuest( questId: string ): boolean {
        for( let i: number = 0, ii: number = this.quests.length; i < ii; i += 1 ) {
            let quest: IQuest = this.quests[ i ];

            if( quest._id === questId ) {
                this.quests.splice( i, 1 );

                return true;
            }
        }

        return false;
    }

    getAllQuests(): IQuest[] {
        return this.quests;
    }

    getQuest( questId: string ): IQuest {
        return this.getQuestById( questId );
    }

    setQuests( quests: IQuest[] ): void {
        this.quests = quests;
    }

}
