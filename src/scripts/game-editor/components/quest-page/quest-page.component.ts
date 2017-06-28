import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService } from '../../services/game-data/game-data.service';
import { GameLoaderService } from 'game-loader/services';

import { IStepMetadata, IQuestParam, IQuestMetadata, IQuestList } from '../../interfaces';

@Component( {
    selector: 'quest-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './quest-page.tpl.html',
    styleUrls: [ './quest-page.style.less' ]
} )

export class QuestPageComponent implements OnInit, OnDestroy {

    private questMetadata: IQuestMetadata;
    private routeParams: Subscription;

    private rubricaId: string;
    private questId: string;
    private questNumber: string;
    private questName: string;

    private steps: any[] = [];

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getQuestMetadata( questNumber: string ): void {
        this.gameDataService.getQuestParam( questNumber )
            .then( ( questParam: IQuestParam ) => {
                this.questNumber = questParam.number;
                this.questName = questParam.name;

                return this.gameDataService.getQuests( [ questParam ] );
            } )
            .then( ( questMetadata: IQuestList ) => {
                this.questMetadata = questMetadata[ questNumber ];

                this.parseSteps( this.questMetadata );

                return this.drawSteps();
            } )
            .then( ( questMetadata: IQuestList ) => {
                this.loaderService.hide();
            } )
            .catch( ( err ) => {
                this.notificationsService.warn( err );
                this.router.navigateByUrl( '/game-editor/' + this.rubricaId );

                console.error( 'Wrong quest number' );
            } );
    }

    private drawSteps(): Promise<any> {
        this.loaderService.show( 'Идет построение шагов...' );

        return new Promise( ( resolve, reject ) => {

        } );
    }

    private parseSteps( questMetadata: IQuestMetadata ): void {
        for( let key in questMetadata ) {
            if( questMetadata.hasOwnProperty( key ) ) {
                let stepData: any = {
                    name: key,
                    metadata: questMetadata[ key ]
                };

                this.steps.push( stepData );
            }
        }

        this.steps.sort( ( a, b ) => {
            let aStep: number = +a.name.slice( 5 );
            let bStep: number = +b.name.slice( 5 );
            return aStep - bStep;
        } );
    }

    stepClick( step: any ): void {

    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.routeParams = this.route.params.subscribe( ( params ) => {
            this.questId = params[ 'questId' ];
            this.rubricaId = params[ 'rubricaId' ];

            this.getQuestMetadata( this.questId );
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
