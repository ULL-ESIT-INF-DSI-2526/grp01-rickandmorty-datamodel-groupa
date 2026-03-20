import { Character } from "../../classes/Character.js";

export interface IInventionCriteria {
    name?: string;
    type?: string;
    inventor?: Character;
    dangerLevel?: number;
}