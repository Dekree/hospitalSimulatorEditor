import { IQuestParam } from './';

export interface IRubrica {
    _id: number;
    rubricaName: string;
    quests: IQuestParam[];
}
