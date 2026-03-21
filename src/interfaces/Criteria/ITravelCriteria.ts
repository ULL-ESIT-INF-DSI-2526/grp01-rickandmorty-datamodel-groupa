import { Character } from "../../classes/Character.js";
import { Dimension } from "../../classes/Dimension.js";

/**
 * Criterios de búsqueda para viajes.
 */
export interface ITravelCriteria {
  originDimension?: Dimension;
  destinyDimension?: Dimension;
  character?: Character;
  date?: Date;
  motive?: string;
}