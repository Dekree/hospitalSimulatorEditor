import { IGame, IRubric, IQuest } from '../interfaces';

export class Game implements IGame {

    _id: string;
    name: string;

    private tutorial: IQuest;
    private rubrics: IRubric[] = [];

    constructor( _id: string, name: string, rubrics?: IRubric[] ) {
        this._id = _id;
        this.name = name;
        this.setRubrics( rubrics );
    }

    private getRubricById( rubricId: string ): IRubric {
        for( let i: number = 0, ii: number = this.rubrics.length; i < ii; i += 1 ) {
            if( this.rubrics[ i ]._id === rubricId ) {
                return this.rubrics[ i ];
            }
        }

        return null;
    }

    addRubric( rubric: IRubric ): void {
        this.rubrics.push( rubric );
    }

    updateRubric( rubricId: string, rubricMetadata: IRubric ): boolean {
        let rubric: IRubric = this.getRubricById( rubricId );
        let questsMetadata: IQuest[] = rubricMetadata.getAllQuests();

        if( typeof rubricMetadata.name !== 'undefined' ) {
            rubric.name = rubricMetadata.name;
            rubric.setQuests( questsMetadata );

            return true;
        }

        return false;
    }

    deleteRubric( rubricId: string ): boolean {
        for( let i: number = 0, ii: number = this.rubrics.length; i < ii; i += 1 ) {
            let rubric: IRubric = this.rubrics[ i ];

            if( rubric._id === rubricId ) {
                this.rubrics.splice( i, 1 );

                return true;
            }
        }

        return false;
    }

    getAllRubrics(): IRubric[] {
        return this.rubrics;
    }

    getRubric( rubricId: string ): IRubric {
        return this.getRubricById( rubricId );
    }

    setRubrics( rubrics: IRubric[] ): void {
        if( typeof rubrics !== 'undefined' && rubrics.length > 0 ) {
            this.rubrics = rubrics;
        }
    }

    getTutorialQuest(): IQuest {
        return this.tutorial;
    }

    setTutorialQuest( tutorialQuest: IQuest ): void {
        this.tutorial = tutorialQuest;
    }

    getAllQuests(): IQuest[] {
        let result: IQuest[] = [];

        for( let i: number = 0, ii: number = this.rubrics.length; i < ii; i += 1 ) {
            let quests: IQuest[] = this.rubrics[ i ].getAllQuests();

            result.concat( quests );
        }

        return result;
    }

}
