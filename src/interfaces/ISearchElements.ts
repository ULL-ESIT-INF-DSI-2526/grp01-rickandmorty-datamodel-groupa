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

/**
 * Interfaz que define los métodos de búsqueda para los elementos del multiverso de Rick and Morty. Esta interfaz es implementada por la clase MultiverseManager para proporcionar funcionalidades de búsqueda específicas para personajes, localizaciones, inventos y viajes en el multiverso.
 */
export interface ISearchElements  {
    /** 
     * Busca personajes que coincidan con los criterios especificados.
     * @param criteria - Criterios de búsqueda para los personajes.
     * @param mode - Modo de ordenamiento.
     * @param order - Orden de los resultados.
     * @returns Array de personajes que coinciden con los criterios.
     */
    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[];

    /**
     * Busca localizaciones que coincidan con los criterios especificados.
     * @param criteria - Criterios de búsqueda para las localizaciones.
     * @returns Array de localizaciones que coinciden con los criterios.
     */
    searchLocations(criteria: ILocationCriteria): Location[];

    /**
     * Busca inventos que coincidan con los criterios especificados.
     * @param criteria - Criterios de búsqueda para los inventos.
     * @returns Array de inventos que coinciden con los criterios.
     */
    searchInventions(criteria: IInventionCriteria): Invention[];

    /**
     * Busca dimensiones alternativas a la dimensión de origen de un personaje.
     * @param name - Nombre del personaje.
     * @return Array de dimensiones alternativas a la dimensión de origen de un personaje.
     */
    searchAlternativeLocationOfACharacter(name: string): Dimension[];

    /**
     * Busca viajes que coincidan con los criterios especificados.
     * @param criteria - Criterios de búsqueda para los viajes.
     * @returns Array de viajes que coinciden con los criterios.
     */
    searchTravel(criteria: ITravelCriteria): Travel[];
}