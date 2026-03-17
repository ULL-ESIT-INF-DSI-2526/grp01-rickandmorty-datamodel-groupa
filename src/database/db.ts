import { Character } from "../classes/Character.js";
import { Dimension } from "../classes/Dimension.js";
import { Invention } from "../classes/Invention.js";
import { Location } from "../classes/Location.js";
import { Species } from "../classes/Species.js";

export interface IDataBase {
    characters: Character[];
    dimensions: Dimension[];
    inventions: Invention[];
    locations: Location[];
    species: Species[];

}