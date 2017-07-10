import { IGame } from '../metadata/IGame';
import { IRubric } from '../metadata/IRubric';
import { IQuest } from '../metadata/IQuest';
import { IStep } from '../metadata/IStep';

export interface IGameDataService {
    getData(): Promise<IGame>;

    getRubric( rubricId: string ): IRubric;
    getQuest( rubricId: string, questId: string ): IQuest;
    getStep( rubricId: string, questId: string, stepId: string ): IStep;
}
