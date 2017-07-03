import { IRubric } from './IRubric';
import { IQuest } from 'game-editor/interfaces/metadata/IQuest';

export interface IGame {
    _id: string;
    name: string;

    addRubric( rubric: IRubric ): void;
    updateRubric( rubricId: string, rubric: IRubric ): boolean;
    deleteRubric( rubricId: string ): boolean;

    getAllRubrics(): IRubric[];
    getRubric( rubricId: string ): IRubric;
    setRubrics( rubrics: IRubric[] ): void;

    getTutorialQuest(): IQuest;
    setTutorialQuest( tutorialQuest: IQuest ): void;

    getAllQuests(): IQuest[];
}
