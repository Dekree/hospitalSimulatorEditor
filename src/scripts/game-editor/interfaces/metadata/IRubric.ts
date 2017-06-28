import { IQuest } from './IQuest';
import { IGame } from './IGame';

export interface IRubric {
    _id: string;
    name: string;

    game: IGame;

    addQuest( quest: IQuest ): void;
    createQuest( name: string ): void;
    updateQuest( questId: string, quest: IQuest ): boolean;
    deleteQuest( questId: string ): boolean;

    getAllQuests(): IQuest[];
    getQuest( questId: string ): IQuest;
    setQuests( quests: IQuest[] ): void;
}
