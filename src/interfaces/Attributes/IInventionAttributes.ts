import { Character } from "../../classes/Character.js";
import { GeneralAttributes } from "./IGeneralAttributes.js";
import { Location } from "../../classes/Location.js";

/**
 * Atributos específicos para inventos.
 */
export interface InventionAttributes extends GeneralAttributes {
  /** Personaje que inventó el invento. */
  inventor: Character;
  /** Tipo de invento (tecnológico, biológico, etc.). */
  type: string;
  /** Nivel de peligro del invento (1-10). */
  dangerLevel: number;
  /** Descripción del invento. */
  description: string;
  /** Ubicación donde se encuentra el invento. */
  inventionLocation: Location; 
}