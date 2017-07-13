import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService } from '../../services';
import { GameLoaderService } from 'game-loader/services';

import { IGame, IRubric, IQuest, IStep } from '../../interfaces';

@Component( {
    selector: 'quest-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './quest-page.tpl.html',
    styleUrls: [ './quest-page.style.less' ]
} )

export class QuestPageComponent implements OnInit, OnDestroy {

    private routeParams: Subscription;

    private quest: IQuest;

    private rubric: IRubric;
    private steps: IStep[];

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getData( rubricId: string, questId: string ): Promise<any> {
        return this.gameDataService.getGame()
            .then( ( game: IGame ) => {
                this.rubric = game.getRubric( rubricId );
                this.quest = this.rubric.getQuest( questId );
                this.steps = this.quest.getAllSteps();

                if( this.rubric === null ) {
                    this.notificationsService.warn( 'Такого квеста не существует' );
                    this.router.navigateByUrl( '/game-editor/' + this.rubric._id );

                    return Promise.reject( 'Wrong quest number' );
                }
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.routeParams = this.route.params.subscribe( ( params: Params ) => {
            let rubricId: string = params[ 'rubricId' ];
            let questId: string = params[ 'questId' ];

            this.getData( rubricId, questId )
                .then( () => {
                    this.loaderService.hide();
                } );
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
