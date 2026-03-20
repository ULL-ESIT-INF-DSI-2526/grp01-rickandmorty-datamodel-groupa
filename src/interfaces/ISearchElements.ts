import { Location} from "../classes/Location.js";
import { Invention } from "../classes/Invention.js";
import { Species } from "../classes/Species.js";
import { Dimension } from "../classes/Dimension.js";
import { Character } from "../classes/Character.js";
import { ICharacterCriteria } from "./Criteria/ICharacterCriteria.js";
import { ILocationCriteria } from "./Criteria/ILocationCriteria.js";
import { IInventionCriteria } from "./Criteria/IInventionCriteria.js";
import { SortMode } from "../types/SortMode.js";
import { SortOrder } from "../types/SortOrder.js";
import { Travel } from "../classes/Travel.js";
import { ITravelCriteria } from "./Criteria/ITravelCriteria.js";


export interface ISearchElements  {
    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[];
    searchLocations(criteria: ILocationCriteria): Location[];
    searchInventions(criteria: IInventionCriteria): Invention[];
    //No estoy segura de si esto es asi
    searchAlternativeLocationOfACharacter(name: string): Dimension[];
    searchTravel(criteria: ITravelCriteria): Travel[];
}