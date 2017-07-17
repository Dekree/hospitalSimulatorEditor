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

                if( this.rubric === null ) {
                    this.goWrongUrl( rubricId, null, null );
                    return Promise.reject( 'wrong address' );
                }

                this.quest = this.rubric.getQuest( questId );

                if( this.quest === null ) {
                    this.goWrongUrl( rubricId, questId, null );
                    return Promise.reject( 'wrong address' );
                }

                this.steps = this.quest.getAllSteps();
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private goWrongUrl( rubricId: string, questId: string, stepId: string ): void {
        let wrongUrl: string = this.gameDataService.buildWrongUrl( rubricId, questId, stepId );

        this.notificationsService.warn( 'Такой страницы не существует' );
        this.router.navigateByUrl( wrongUrl );
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
