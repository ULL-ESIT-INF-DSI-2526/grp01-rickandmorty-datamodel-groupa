import { Dimension } from "../../classes/Dimension.js";
import { Species } from "../../classes/Species.js";
import { CharacterState } from "../../types/CharacterState.js";
import { GeneralAttributes } from "./IGeneralAttributes.js";

/**
 * Representa los atributos que definen a un Personaje.
 * 
 * Esta interfaz describe la estructura de los datos necesarios
 * para crear o representar a un personaje del multiverso.
 */
export interface CharacterAttributes extends GeneralAttributes {
  /** Especie del personaje. */
  species: Species;

  /**Dimensión de origen del personaje. */
  originDimension: Dimension;

  /** Estado en el que se encuentra el personaje (Ejemplo: Vivo, Muerto, Desconocido, Robot-sustituto).*/
  state: CharacterState;

  /** Afiliación a la que pertenece el personaje (Ejemplo: Federación Galáctica, Consejo de Ricks, Familia Smith, Independiente).*/
  affiliation: string;

  /** Escala del 1 al 10 de la inteligencia del personaje. */
  inteligenceLevel: number;

  /** Breve biografía o notas relevantes sobre el personaje.*/
  description: string;
}