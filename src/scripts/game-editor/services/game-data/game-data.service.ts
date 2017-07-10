import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {
    IGameDataService,
    IGame, IGameData,
    IRubric, IRubricData,
    IQuest, IQuestData,
    IStep, IStepData
} from '../../interfaces';

import { Game, Rubric, Quest, Step } from '../../classes';

@Injectable()
export class GameDataService implements IGameDataService {

    private baseUrl: string = '../data/';
    private fileType: string = '.json';

    private game: IGame;

    constructor( private http: Http ) {
    }

    private get( url: string ): Promise<any> {
        return this.http
            .get( url )
            .toPromise()
            .then( ( data: any ) => {
                return data.json();
            } );
    }

    private getQuestData( rubric: IRubric, questId: string ): Promise<IQuest> {
        return this.get( this.baseUrl + 'q' + questId + this.fileType )
            .then( ( data: any ) => {

                if( data === null || typeof data === 'undefined' ) {
                    console.log( 'Error in download quest ' + ( 'q' + questId ) );
                }

                let questData: IQuestData = data.json();
                let quest: IQuest = new Quest( questId, questData.name, rubric );
                let steps: IStep[] = questData.steps.map( ( stepData: IStepData ) => {
                    return new Step( stepData._id, quest, stepData.metadata );
                } );

                quest.setSteps( steps );

                return quest;
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private getItemById( arr: any[], id: string ): any {
        for( let i: number = 0, ii: number = arr.length; i < ii; i += 1 ) {
            if( arr[ i ]._id === id ) {
                return arr[ i ];
            }
        }

        return [];
    }

    private getQuestsData( rubric: IRubric, questList: string[], i: number, result: IQuest[] ): Promise<IQuest[]> {
        return this.getQuestData( rubric, questList[ i ] )
            .then( ( quest: IQuest ) => {
                result.push( quest );

                if( i === questList.length - 1 ) {
                    return result;
                } else {
                    return this.getQuestsData( rubric, questList, i + 1, result );
                }
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private getAllQuestsData( rubric: IRubric, rubricData: IRubricData): Promise<IQuest[]> {
        let questList: string[] = rubricData.quests.slice();

        return this.getQuestsData( rubric, questList, 0, [] )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private createRuric( game: IGame, rubricData: IRubricData, i: number ): Promise<IRubric> {
        let rubric: IRubric = new Rubric( i + '', rubricData.name, this.game );

        return this.getAllQuestsData( rubric, rubricData )
            .then( ( quests: IQuest[] ) => {
                rubric.setQuests( quests );

                return rubric;
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private createRubrics( rubricsData: IRubricData[], index: number, result: IRubric[] ): Promise<IRubric[]> {
        return this.createRuric( this.game, rubricsData[ index ], index )
            .then( ( rubric: IRubric ) => {
                result.push( rubric );

                if( index === rubricsData.length - 1 ) {
                    return result;
                } else {
                    return this.createRubrics( rubricsData, index + 1, result );
                }
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    getData(): Promise<IGame> {
        return this.get( this.baseUrl + 'game' + this.fileType )
            .then( ( gameData: IGameData ) => {
                this.game = new Game( gameData._id, gameData.name );

                return gameData.rubrics;
            } )
            .then( ( rubricsData: IRubricData[] ) => {
                return this.createRubrics( rubricsData, 0, [] );
            } )
            .then( ( rubrics: IRubric[] ) => {
                this.game.setRubrics( rubrics );

                return this.getQuestData( null, '0' );
            } )
            .then( ( tutorial: IQuest ) => {
                this.game.setTutorialQuest( tutorial );

                return this.game;
            } );
    }

    getRubric( rubricId: string ): IRubric {
        let rubrics: IRubric[] = this.game.getAllRubrics();

        return this.getItemById( rubrics, rubricId );
    }

    getQuest( rubricId: string, questId: string ): IQuest {
        let rubric: IRubric = this.getRubric( rubricId );
        let quests: IQuest[] = rubric.getAllQuests();

        return this.getItemById( quests, questId );
    }

    getStep( rubricId: string, questId: string, stepId ): IStep {
        let quest: IQuest = this.getQuest( rubricId, questId );
        let steps: IStep[] = quest.getAllSteps();

        return this.getItemById( steps, stepId );
    }

}
