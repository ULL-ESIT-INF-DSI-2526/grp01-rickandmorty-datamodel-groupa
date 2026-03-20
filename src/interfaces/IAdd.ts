import { Location} from "../classes/Location.js";
import { Invention } from "../classes/Invention.js";
import { Species } from "../classes/Species.js";
import { Dimension } from "../classes/Dimension.js";
import { Character } from "../classes/Character.js";
import { Travel } from "../classes/Travel.js";

export interface IAdd {
    addDimension(new_dimension: Dimension): void;
    addLocation(new_location: Location): void;
    addCharacter(new_character: Character): void;
    addSpecie(new_specie: Species): void;
    addInvention(new_invention: Invention): void;
    addTravel(new_travel: Travel): void;
}