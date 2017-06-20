import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { GameLoaderService } from 'game-loader/services';

import { IRubrica } from '../../interfaces';
import { GameDataService } from '../../services';

@Component( {
    selector: 'game-editor-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './game-editor-page.tpl.html',
    styleUrls: [ './game-editor-page.style.less' ],
    providers: [ GameDataService ]
} )

export class GameEditorPageComponent implements OnInit {

    private header: string = 'Симулятор поликлиники';

    private rubrics: IRubrica[] = [];

    private loaderService: GameLoaderService;

    constructor( private gameDataService: GameDataService ) {
        this.loaderService = new GameLoaderService();
    }

    private getRubrics(): Promise<any> {
        return Promise.resolve()
            .then( () => {
                return this.gameDataService.getRubrics();
            } )
            .then( ( rubrics: IRubrica[] ) => {
                console.log( rubrics );
                this.rubrics = rubrics;
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

    private drawRubrics(): Promise<any> {
        this.loaderService.show( 'Идет построение рубрик...' );

        return new Promise( ( resolve, reject ) => {

        } );
    }

    ngOnInit() {
        this.loaderService.show( 'Идет загрузка данных...' );

        this.getRubrics()
            .then( () => {
                return this.drawRubrics();
            } )
            .then( () => {
                this.loaderService.hide();
            } )
            .catch( ( err ) => {
                console.error( err );
            } );
    }

}
