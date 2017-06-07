import { IStepReport } from './IStepReport';

export interface IQuestReport {
    name: string;
    number: string;
    points: number;
    success: boolean;
    fail: boolean;
    time: number;
    stepsLength: number;
    finishedSteps: number;
    steps: { [ name: string ]: IStepReport };
}
