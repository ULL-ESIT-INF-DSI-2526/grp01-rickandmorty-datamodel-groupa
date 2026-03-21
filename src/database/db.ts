import { Character } from "../classes/Character.js";
import { Dimension } from "../classes/Dimension.js";
import { Invention } from "../classes/Invention.js";
import { Location } from "../classes/Location.js";
import { Species } from "../classes/Species.js";

/**
 * Interfaz que define la estructura de la base de datos del multiverso de Rick and Morty. 
 */
export interface IDataBase {
    /** Array de personajes en el multiverso. */
    characters: Character[];
    /** Array de dimensiones en el multiverso. */
    dimensions: Dimension[];
    /** Array de inventos en el multiverso. */
    inventions: Invention[];
    /** Array de localizaciones en el multiverso. */
    locations: Location[];
    /** Array de especies en el multiverso. */
    species: Species[];
}