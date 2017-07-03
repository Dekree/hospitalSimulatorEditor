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

    private gameMetadata: IGame;

    constructor( private http: Http ) {
    }

    private get( url: string ): Promise<any> {
        return this.http
            .get( url )
            .toPromise();
    }

    private getQuest( index: number, fullQuestList: any[], result: IQuest[] ): Promise<IQuest[]> {
        let questNumber: string = fullQuestList[ index ].number;

        return this.get( this.baseUrl + questNumber + this.fileType )
            .then( ( data: any ) => {

                if( data === null || typeof data === 'undefined' ) {
                    console.log( 'Error in download quest ' + ( index + 1 ) );
                }

                result[ questNumber ] = data.json();

                if( index < fullQuestList.length - 1 ) {
                    index += 1;
                    return this.getQuest( index, fullQuestList, result );
                } else {
                    return result;
                }
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private parseRubricatorForQuests( rubricator: IRubric[] ): any[] {
        let questList: any[] = [];

        for( let i: number = 0, ii: number = rubricator.length; i < ii; i += 1 ) {
            let quests: any[] = rubricator[ i ].quests;

            quests.forEach( ( quest: any ) => {
                let isExist: boolean = false;
                questList.forEach( ( item: any ) => {
                    if( item.number === quest.number ) {
                        isExist = true;
                    }
                } );

                if( !isExist ) {
                    questList.push( quest );
                }
            } );
        }

        questList.sort( ( a, b ) => {
            let left: number = +a.number.slice( 1 );
            let right: number = +b.number.slice( 1 );
            return left - right;
        } );
    }

    private getGameData(): Promise<IGameData> {
        return this.get( this.baseUrl + 'game' + this.fileType )
            .then( ( data: any ) => {
                return data.json();
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private getTutorialQuest(): Promise<IQuest> {
        let result: IQuest[] = [];
        return Promise.resolve()
            .then( () => {
                return this.getQuest( 0, [ 'q0' ], result )[ 0 ];
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private getQuests( questList: string[] ): Promise<IQuest[]> {
        let result: IQuest[] = [];

        return Promise.resolve()
            .then( () => {
                return this.getQuest( 0, questList, result );
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    getData(): Promise<IGame> {
        return this.getGameData()
            .then( ( game: IGameData ) => {
                this.game = new Game( '0', '', game, rubrics );
            } );
    }

}
