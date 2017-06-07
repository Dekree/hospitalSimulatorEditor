import { IQuestReport } from './IQuestReport';

export interface IReport {
    rubricaName: string;
    quests: IQuestReport[];
    totalPoints: number;
}
