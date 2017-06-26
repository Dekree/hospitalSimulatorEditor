import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService } from '../../services/game-data/game-data.service';
import { GameLoaderService } from 'game-loader/services';

import { IRubrica, IQuestMetadata, IQuestList, IQuestParam } from '../../interfaces';

@Component( {
    selector: 'rubric-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rubric-page.tpl.html',
    styleUrls: [ './rubric-page.style.less' ]
} )

export class RubricPageComponent implements OnInit, OnDestroy {

    private rubricaName: string = '';

    private rubrica: IRubrica;
    private quests: IQuestMetadata[] = [];

    private routeParams: Subscription;

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getPageData( rubricaId: string ): void {
        this.getRubrica( rubricaId )
            .then( () => {
                return this.getQuests();
            } )
            .then( () => {
                return this.drawQuests();
            } )
            .then( () => {
                this.loaderService.hide();
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private getQuestParamByNumber( questNumber: string ): IQuestParam {
        let questParam: IQuestParam[] = this.rubrica.quests;
        for( let i: number = 0, ii: number = questParam.length; i < ii; i += 1 ) {
            if( questParam[ i ].number === questNumber ) {
                return questParam[ i ];
            }
        }
    }

    private getRubrica( rubricaId: string ): Promise<any> {
        return this.gameDataService.getRubrics()
            .then( ( rubrics: IRubrica[] ) => {
                rubrics.forEach( ( rubrica: IRubrica ) => {
                    if( rubrica._id === rubricaId ) {
                        this.rubrica = rubrica;
                        this.rubricaName = rubrica.rubricaName;
                    }
                } );

                if( typeof this.rubrica === 'undefined' ) {
                    this.notificationsService.warn( 'Такой рубрики не существует' );
                    this.router.navigateByUrl( '/game-editor' );

                    return Promise.reject( 'Wrong rubrica number' );
                }
            } );
    }

    private getQuests(): Promise<any> {
        let questParams: IQuestParam[] = this.rubrica.quests.slice();

        return this.gameDataService.getQuests( questParams )
            .then( ( questList: IQuestList ) => {
                for( let key in questList ) {
                    if( questList.hasOwnProperty( key ) ) {
                        let quest: any = {
                            number: key,
                            name: this.getQuestParamByNumber( key ).name,
                            metadata: questList[ key ]
                        };

                        this.quests.push( quest );
                    }
                }
            } );
    }

    private drawQuests(): Promise<any> {
        this.loaderService.show( 'Идет построение квестов...' );

        return new Promise( ( resolve, reject ) => {

        } );
    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.routeParams = this.route.params.subscribe( ( params ) => {
            if( typeof params[ 'rubricaId' ] !== 'undefined' ) {
                let rubricaId: string = params[ 'rubricaId' ];

                this.getPageData( rubricaId );
            }
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
