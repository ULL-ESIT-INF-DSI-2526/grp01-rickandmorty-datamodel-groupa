import { Location} from "../classes/Location.js";
import { Invention } from "../classes/Invention.js";
import { Species } from "../classes/Species.js";
import { Dimension } from "../classes/Dimension.js";
import { Character } from "../classes/Character.js";
import { Travel } from "../classes/Travel.js";

/**
 * Interfaz que define los métodos para agregar elementos al multiverso de Rick and Morty.
 * Esta interfaz es implementada por la clase MultiverseManager 
 * para proporcionar funcionalidades de adición específicas para personajes, 
 * localizaciones, inventos, dimensiones y viajes en el multiverso.
 */
export interface IAdd {
    /**
     * Agrega una nueva dimensión al multiverso.
     * @param new_dimension - Objeto de tipo Dimension que representa la nueva dimensión a agregar.
     */
    addDimension(new_dimension: Dimension): void;
    /**
     * Agrega una nueva localización al multiverso.
     * @param new_location - Objeto de tipo Location que representa la nueva localización a agregar.
     */
    addLocation(new_location: Location): void;
    /**
     * Agrega un nuevo personaje al multiverso.
     * @param new_character - Objeto de tipo Character que representa el nuevo personaje a agregar.
     */
    addCharacter(new_character: Character): void;
    /**
     * Agrega una nueva especie al multiverso.
     * @param new_specie - Objeto de tipo Species que representa la nueva especie a agregar.
     */
    addSpecie(new_specie: Species): void;
    /**
     * Agrega un nuevo invento al multiverso.
     * @param new_invention - Objeto de tipo Invention que representa el nuevo invento a agregar.
     */    
    addInvention(new_invention: Invention): void;
    /**
     * Agrega un nuevo viaje al multiverso.
     * @param new_travel - Objeto de tipo Travel que representa el nuevo viaje a agregar.
     */
    addTravel(new_travel: Travel): void;
}