import { IQuestData } from './IQuestData';

export interface IRubricData {
    _id: string;
    name: string;
    quests: IQuestData[];
}
