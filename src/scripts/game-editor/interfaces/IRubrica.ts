import { IQuestParam } from './';

export interface IRubrica {
    _id: string;
    rubricaName: string;
    quests: IQuestParam[];
}
