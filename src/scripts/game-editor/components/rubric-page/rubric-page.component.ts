import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService } from '../../services';
import { GameLoaderService } from 'game-loader/services';

import { IRubrica, IQuestMetadata, IQuestList, IQuestParam } from '../../interfaces';

@Component( {
    selector: 'rubric-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rubric-page.tpl.html',
    styleUrls: [ './rubric-page.style.less' ]
} )

export class RubricPageComponent implements OnInit, OnDestroy {

    private rubricName: string;
    private rubricId: string;

    private rubric: IRubrica;
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

    private getRubrica( rubricId: string ): Promise<any> {
        return this.gameDataService.getRubrics()
            .then( ( rubrics: IRubrica[] ) => {

                rubrics.forEach( ( rubric: IRubrica ) => {
                    if( rubric._id === rubricId ) {
                        this.rubric = rubric;
                        this.rubricName = rubric.rubricaName;
                        this.rubricId = rubric._id;
                    }
                } );

                if( typeof this.rubric === 'undefined' ) {
                    this.notificationsService.warn( 'Такой рубрики не существует' );
                    this.router.navigateByUrl( '/game-editor' );

                    return Promise.reject( 'Wrong rubrica number' );
                }
            } );
    }

    private getQuests(): Promise<any> {
        let questParams: IQuestParam[] = this.rubric.quests.slice();

        return this.gameDataService.getQuests( questParams )
            .then( ( questList: IQuestList ) => {
                for( let key in questList ) {
                    if( questList.hasOwnProperty( key ) ) {
                        let quest: any = {
                            number: key,
                            name: this.gameDataService.getQuestParamByNumber( questParams, key ).name,
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

    questClick( quest: any ): void {

    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.routeParams = this.route.params.subscribe( ( params ) => {
            if( typeof params[ 'rubricId' ] !== 'undefined' ) {
                let rubricId: string = params[ 'rubricId' ];

                this.getPageData( rubricId );
            }
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
