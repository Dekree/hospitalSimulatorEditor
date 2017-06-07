import { IQuestParam, IRubrica, IQuestMetadata, IQuestList, } from '../../interfaces';

export class GameDataService {

    baseUrl: string = '../data/';
    fileType: string = '.json';

    private getQuest( index: number, fullQuestList: IQuestParam[], result: IQuestList ): Promise<IQuestList> {
        let questNumber: string = fullQuestList[ index ].number;

        return new Promise( ( resolve, reject ) => {
            $.ajax( {
                method: 'get',
                url: this.baseUrl + questNumber + this.fileType,
                success: function( data: IQuestMetadata ) {
                    resolve( data );
                },
                error: ( err ) => {
                    console.error( 'Server error' );
                    console.error( err );
                    reject( err );
                }
            } );
        } )
            .then( ( data: IQuestMetadata ) => {
                if( data === null || typeof data === 'undefined' ) {
                    console.log( 'Error in download quest ' + ( index + 1 ) );
                }

                result[ questNumber ] = data;

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

    getRubrics(): Promise<IRubrica[]> {
        return new Promise( ( resolve, reject ) => {
            $.ajax( {
                method: 'get',
                url: this.baseUrl + 'rubricator' + this.fileType,
                success: function( data ) {
                    resolve( data );
                },
                error: ( err ) => {
                    console.error( 'Server error' );
                    console.error( err );
                    reject( err );
                }
            } );
        } )
            .then( ( data: IRubrica[] ) => {
                if( !data ) {
                    console.log( 'Error in download rubricator' );
                }
                return data;
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
            .catch( ( err ) => {
                console.error( err );
            } );
    }

}
