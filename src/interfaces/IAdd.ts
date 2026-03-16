import { Location} from "../classes/Location";
import { Invention } from "../classes/Invention";
import { Species } from "../classes/Species";
import { Dimension } from "../classes/Dimension";
import { Character } from "../classes/Character";

export interface IAdd {
    addDimension(new_dimension: Dimension): void;
    addLocation(new_location: Location): void;
    addCharacter(new_character: Character): void;
    addSpecie(new_specie: Species): void;
    addInvention(new_invention: Invention): void;
}