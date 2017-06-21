import { Component, ViewEncapsulation } from '@angular/core';
import { GameDataService } from '../../services/game-data/game-data.service';
import { IRubrica } from '../../interfaces/IRubrica';

@Component( {
    selector: 'rubric-page',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rubric-page.tpl.html',
    styleUrls: [ './rubric-page.style.less' ]
} )

export class RubricPageComponent {

    private rubrica: IRubrica;

    constructor( private gameDataService: GameDataService ) {

    }

}
