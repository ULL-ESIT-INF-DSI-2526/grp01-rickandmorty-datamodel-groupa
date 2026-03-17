import { Location} from "../classes/Location.js";
import { Invention } from "../classes/Invention.js";
import { Species } from "../classes/Species.js";
import { Dimension } from "../classes/Dimension.js";
import { Character } from "../classes/Character.js";
import { ICharacterCriteria } from "./ICharacterCriteria.js";
import { ILocationCriteria } from "./ILocationCriteria.js";
import { IInventionCriteria } from "./IInventionCriteria.js";
import { SortMode } from "../types/SortMode.js";
import { SortOrder } from "../types/SortOrder.js";


export interface ISearchElements  {
    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[];
    searchLocations(criteria: ILocationCriteria): Location[];
    searchInventions(criteria: IInventionCriteria): Invention[];
    //No estoy segura de si esto es asi
    searchAlternativeLocationOfACharacter(name: string): Dimension[];
}