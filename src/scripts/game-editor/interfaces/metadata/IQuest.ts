import { IStep } from './IStep';
import { IRubric } from './IRubric';

export interface IQuest {
    _id: string;
    name: string;

    rubric: IRubric;

    addStep( step: IStep ): void;
    createStep( name: string ): void;
    updateStep( stepId: string, step: IStep ): boolean;
    deleteStep( stepId: string ): boolean;

    getAllSteps(): IStep[];
    getStep( stepId: string ): IStep;
    setSteps( steps: IStep[] ): void;
}
