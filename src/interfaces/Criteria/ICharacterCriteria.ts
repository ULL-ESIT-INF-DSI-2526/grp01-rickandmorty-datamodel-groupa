import { Dimension } from "../../classes/Dimension.js";
import { Species } from "../../classes/Species.js";

/**
 * Criterios de búsqueda para personajes.
 */
export interface ICharacterCriteria {
    name?: string;
    specie?: Species;
    affiliation?: string;
    state?: string;
    originDimension?: Dimension;
}