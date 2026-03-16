import { Character } from "../classes/Character";

export interface IInventionCriteria {
    name?: string;
    type?: string;
    inventor?: Character;
    dangerLevel?: number;
}