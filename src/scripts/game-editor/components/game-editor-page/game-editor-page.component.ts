import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { GameLoaderService } from 'game-loader/services';

import { IRubrica } from '../../interfaces';
import { GameDataService } from '../../services';

@Component( {
    selector: 'game-editor-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './game-editor-page.tpl.html',
    styleUrls: [ './game-editor-page.style.less' ]
} )

export class GameEditorPageComponent implements OnInit {

    private header: string = 'Симулятор поликлиники';

    private rubrics: IRubrica[] = [];

    constructor( private gameDataService: GameDataService,
                 private loaderService: GameLoaderService) {
    }

    private getRubrics(): Promise<any> {
        return Promise.resolve()
            .then( () => {
                return this.gameDataService.getRubrics();
            } )
            .then( ( rubrics: IRubrica[] ) => {
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

    rubricClick( rubric: IRubrica ): void {

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
