import { Location} from "../classes/Location";
import { Invention } from "../classes/Invention";
import { Species } from "../classes/Species";
import { Dimension } from "../classes/Dimension";
import { Character } from "../classes/Character";
import { ICharacterCriteria } from "./ICharacterCriteria";
import { ILocationCriteria } from "./ILocationCriteria";
import { IInventionCriteria } from "./IInventionCriteria";
import { SortMode } from "../types/SortMode";
import { SortOrder } from "../types/SortOrder";


export interface ISearchElements  {
    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[];
    searchLocations(criteria: ILocationCriteria): Location[];
    searchInventions(criteria: IInventionCriteria): Invention[];
    //No estoy segura de si esto es asi
    searchAlternativeLocationOfACharacter(name: string): Dimension[];
}