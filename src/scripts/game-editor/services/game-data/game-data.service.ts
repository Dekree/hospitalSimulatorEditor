import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { IQuestParam, IRubrica, IQuestMetadata, IQuestList, } from '../../interfaces';

@Injectable()
export class GameDataService {

    private baseUrl: string = '../data/';
    private fileType: string = '.json';

    private rubrics: IRubrica[] = null;
    private questList: IQuestList = {};

    constructor( private http: Http ) {
    }

    private get( url: string ): Promise<any> {
        return this.http
            .get( url )
            .toPromise();
    }

    private getQuest( index: number, fullQuestList: IQuestParam[], result: IQuestList ): Promise<IQuestList> {
        let questNumber: string = fullQuestList[ index ].number;
        let questFromCache: IQuestMetadata = this.getQuestMetadataFromCache( questNumber );

        if( questFromCache !== null ) {
            result[ questNumber ] = questFromCache;
            return Promise.resolve( result );
        }

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

    private addRubricsToCache( rubrics: IRubrica[] ): void {
        this.rubrics = rubrics;
    }

    private addQuestMetadataToCache( questList: IQuestList ): void {
        for( let key in questList ) {
            if( questList.hasOwnProperty( key ) ) {
                this.questList[ key ] = questList[ key ];
            }
        }
    }

    private getRubricsFromCache(): IRubrica[] {
        return this.rubrics;
    }

    private getQuestMetadataFromCache( questNumber: string ): IQuestMetadata {
        if( typeof this.questList[ questNumber ] !== 'undefined' ) {
            return this.questList[ questNumber ];
        }

        return null;
    }

    getRubrics(): Promise<IRubrica[]> {
        let rubricsFromcache: IRubrica[] = this.getRubricsFromCache();

        if( rubricsFromcache !== null ) {
            return Promise.resolve( rubricsFromcache );
        }

        return this.get( this.baseUrl + 'rubricator' + this.fileType )
            .then( ( data: any ) => {
                if( !data ) {
                    console.log( 'Error in download rubricator' );
                }

                let rubrics: IRubrica[] = data.json();

                this.addRubricsToCache( rubrics );

                return rubrics;
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    getTutorialQuest( tutorialQuest: IQuestParam ): Promise<IQuestList> {
        let result: IQuestList = {};

        return Promise.resolve()
            .then( () => {
                return this.getQuest( 0, [ tutorialQuest ], result );
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    getQuests( fullQuestList: IQuestParam[] ): Promise<IQuestList> {
        let result: IQuestList = {};

        return Promise.resolve()
            .then( () => {
                return this.getQuest( 0, fullQuestList, result );
            } )
            .then( ( questList: IQuestList ) => {

                this.addQuestMetadataToCache( questList );

                return questList;
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

}
