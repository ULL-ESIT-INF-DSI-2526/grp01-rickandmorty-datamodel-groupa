import { Dimension } from "../classes/Dimension";
import { Species } from "../classes/Species";

export interface ICharacterCriteria {
    name?: string;
    specie?: Species;
    affiliation?: string;
    state?: string;
    originDimension?: Dimension;
}