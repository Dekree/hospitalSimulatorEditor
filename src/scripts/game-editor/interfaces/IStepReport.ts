import { IStepMetadata } from './IStepMetadata';

export interface IStepReport {
    name: string;
    metadata: IStepMetadata;
    attempts: number;
    answers: string[];
    success: boolean;
    rightAnswer: string;
}
