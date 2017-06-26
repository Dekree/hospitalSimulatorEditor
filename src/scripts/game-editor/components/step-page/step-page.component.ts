import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService } from '../../services/game-data/game-data.service';
import { GameLoaderService } from 'game-loader/services';

import { IStepMetadata, IQuestParam, IQuestMetadata, IQuestList } from '../../interfaces';

@Component( {
    selector: 'step-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step-page.tpl.html',
    styleUrls: [ './step-page.style.less' ]
} )

export class StepPageComponent implements OnInit, OnDestroy {

    private questData: any;

    private questName: string = '';
    private rubricaId: string;
    private questId: string;

    private steps: IStepMetadata[] = [];
    private routeParams: Subscription;

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getQuestMetadata( questNumber: string ): void {
        let questParam: IQuestParam = {
            number: questNumber,
            name: ''
        };

        this.gameDataService.getQuests( [ questParam ] )
            .then( ( questMetadata: IQuestList ) => {

            } );
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
