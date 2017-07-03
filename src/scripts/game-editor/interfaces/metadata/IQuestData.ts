import { IStepData } from './IStepData';

export interface IQuestData {
    _id: string;
    name: string;
    steps: IStepData[];
}
