import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService, TranslatorService } from '../../services';
import { GameLoaderService } from 'game-loader/services';

import { IGame, IRubric, IQuest, IStep } from '../../interfaces';

@Component( {
    selector: 'step-live-view-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step-live-view-page.tpl.html',
    styleUrls: [ './step-live-view-page.style.less' ]
} )

export class StepLiveViewPageComponent {

    private routeParams: Subscription;

    private step: IStep;

    private rubric: IRubric;
    private quest: IQuest;

    private stepMetadata: any;

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private translatorService: TranslatorService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getData( rubricId: string, questId: string, stepId: string ): Promise<any> {
        return this.gameDataService.getGame()
            .then( ( game: IGame ) => {
                this.rubric = game.getRubric( rubricId );

                if( this.rubric === null ) {
                    this.goWrongUrl( rubricId, null, null );
                    return Promise.reject( 'wrong address' );
                }

                this.quest = this.rubric.getQuest( questId );

                if( this.quest === null ) {
                    this.goWrongUrl( rubricId, questId, null );
                    return Promise.reject( 'wrong address' );
                }

                this.step = this.quest.getStep( stepId );

                if( this.step === null ) {
                    this.goWrongUrl( rubricId, questId, stepId );
                    return Promise.reject( 'wrong address' );
                }

                this.stepMetadata = this.step.getMetadata();
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private goWrongUrl( rubricId: string, questId: string, stepId: string ): void {
        let wrongUrl: string = this.gameDataService.buildWrongUrl( rubricId, questId, stepId );

        this.notificationsService.warn( 'Такой страницы не существует' );
        // this.router.navigateByUrl( wrongUrl );
    }

    private openPreview(): Promise<any> {
        let iframe: any = window.frames[ 0 ];

        return Promise.resolve();
    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        console.log( this.route );

        this.routeParams = this.route.params.subscribe( ( params: Params ) => {
            let rubricId: string = params[ 'rubricId' ];
            let questId: string = params[ 'questId' ];
            let stepId: string = params[ 'stepId' ];

            this.getData( rubricId, questId, stepId )
                .then( () => {
                    return this.loaderService.hide();
                } )
                .then( () => {
                    return this.openPreview();
                } );
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
