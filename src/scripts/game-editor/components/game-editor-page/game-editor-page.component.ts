import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { GameLoaderService } from 'game-loader/services';
import { GameDataService } from '../../services';

import { IGame, IRubric } from '../../interfaces';

@Component( {
    selector: 'game-editor-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './game-editor-page.tpl.html',
    styleUrls: [ './game-editor-page.style.less' ]
} )

export class GameEditorPageComponent implements OnInit {

    private game: IGame;

    private rubrics: IRubric[];

    constructor( private gameDataService: GameDataService,
                 private loaderService: GameLoaderService) {
    }

    private getData(): Promise<any> {
        return this.gameDataService.getGame()
            .then( ( game: IGame ) => {
                this.game = game;
                this.rubrics = game.getAllRubrics();
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.getData()
            .then( () => {
                this.loaderService.hide();
            } )
            .catch( ( err ) => {
                console.error( err );
                this.loaderService.hide();
            } );
    }

}
