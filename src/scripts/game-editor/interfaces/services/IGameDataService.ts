import { Params } from '@angular/router';

import { IGame } from '../metadata/IGame';
import { IRubric } from '../metadata/IRubric';
import { IQuest } from '../metadata/IQuest';
import { IStep } from '../metadata/IStep';

export interface IGameDataService {
    getData(): Promise<IGame>;

    getRubric( params: Params ): Promise<IRubric>;
    getQuest( params: Params ): Promise<IQuest>;
    getStep( params: Params ): Promise<IStep>;

    saveData( data: IGame ): Promise<IGame>;
}
