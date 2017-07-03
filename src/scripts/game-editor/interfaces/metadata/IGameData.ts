import { IRubricData } from './IRubricData';

export interface IGameData {
    _id: string;
    name: string;
    rubrics: IRubricData[];
}
