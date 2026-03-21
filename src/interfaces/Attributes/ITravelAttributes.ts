import { Character } from "../../classes/Character.js";
import { Dimension } from "../../classes/Dimension.js";

/**
 * Criterios de búsqueda para viajes.
 */
export interface TravelAttributes {
  /** Dimensión de origen del viaje. */
  originDimension: Dimension;
  /** Dimensión de destino del viaje. */
  destinyDimension: Dimension;
  /** Personaje que realiza el viaje. */
  character: Character;
  /** Fecha del viaje. */
  date: Date;
  /** Motivo del viaje. */
  motive: string;
}