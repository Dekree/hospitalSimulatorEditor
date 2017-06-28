import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService, TranslatorService } from '../../services';
import { GameLoaderService } from 'game-loader/services';

import { IStepMetadata, IQuestParam, IQuestMetadata, IQuestList } from '../../interfaces';

@Component( {
    selector: 'step-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step-page.tpl.html',
    styleUrls: [ './step-page.style.less' ]
} )

export class StepPageComponent implements OnInit, OnDestroy {

    private stepMetadata: IStepMetadata;
    private routeParams: Subscription;

    private rubricId: string;
    private questId: string;
    private stepId: string;

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private translatorService: TranslatorService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getStepMetadata( questNumber: string ): void {
        let questParam: IQuestParam = {
            number: questNumber,
            name: ''
        };
        this.gameDataService.getQuests( [ questParam ] )
            .then( ( questMetadata: IQuestList ) => {
                this.stepMetadata = questMetadata[ questNumber ][ this.stepId ];

                if( typeof this.stepMetadata === 'undefined' ) {
                    return Promise.reject( 'Wrong step number' );
                }
                return this.drawStep();
            } )
            .then( () => {
                this.loaderService.hide();
            } )
            .catch( ( err ) => {
                this.notificationsService.warn( 'Такого шага не существует' );
                this.router.navigateByUrl( '/game-editor/' + this.rubricId + '/' + this.questId );

                console.error( err );
            } );
    }

    private drawStep(): Promise<any> {
        this.loaderService.show( 'Идет построение шага...' );

        return new Promise( ( resolve, reject ) => {

        } );
    }

    getText( collectionName: string, word: string ): string {
        return this.translatorService.getTranslatedWord( collectionName, word );
    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.routeParams = this.route.params.subscribe( ( params ) => {
            this.questId = params[ 'questId' ];
            this.rubricId = params[ 'rubricId' ];
            this.stepId = params[ 'stepId' ];

            this.getStepMetadata( this.questId );
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
