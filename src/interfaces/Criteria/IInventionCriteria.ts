import { Character } from "../../classes/Character.js";

/**
 * Criterios de búsqueda para inventos.
 */
export interface IInventionCriteria {
    name?: string;
    type?: string;
    inventor?: Character;
    dangerLevel?: number;
}