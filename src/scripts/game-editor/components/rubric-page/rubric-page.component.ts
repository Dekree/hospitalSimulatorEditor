import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications/dist';

import { GameDataService } from '../../services';
import { GameLoaderService } from 'game-loader/services';

import { IGame, IRubric, IQuest } from '../../interfaces';

@Component( {
    selector: 'rubric-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rubric-page.tpl.html',
    styleUrls: [ './rubric-page.style.less' ]
} )

export class RubricPageComponent implements OnInit, OnDestroy {

    private routeParams: Subscription;

    private rubric: IRubric;

    private quests: IQuest[];

    constructor( private gameDataService: GameDataService,
                 private notificationsService: NotificationsService,
                 private loaderService: GameLoaderService,
                 private router: Router,
                 private route: ActivatedRoute ) {
    }

    private getData( rubricId: string ): Promise<any> {
        return this.gameDataService.getGame()
            .then( ( game: IGame ) => {
                this.rubric = game.getRubric( rubricId );

                if( this.rubric === null ) {
                    this.goWrongUrl( rubricId, null, null );
                    return Promise.reject( 'wrong address' );
                }

                this.quests = this.rubric.getAllQuests();
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

            this.getData( rubricId )
                .then( () => {
                    this.loaderService.hide();
                } );
        } );
    }

    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
