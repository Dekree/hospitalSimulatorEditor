import { Injectable } from '@angular/core';

import * as CONST from '../../interfaces';

@Injectable()
export class TranslatorService {

    constructor() {
    }

    getTranslatedWord( collectionName: string, word: string ): string {
        let collection: any = CONST[ collectionName ];

        if( typeof collection[ word ] !== 'undefined' ) {
            return collection[ word ];
        }

        return '<% У слова нет перевода %>';
    }

}
