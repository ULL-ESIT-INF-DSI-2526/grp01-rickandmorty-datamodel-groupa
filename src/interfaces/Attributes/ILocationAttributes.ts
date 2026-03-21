import { Dimension } from "../../classes/Dimension.js";
import { GeneralAttributes } from "./IGeneralAttributes.js";

/**
 * Atributos específicos para ubicaciones.
 */
export interface LocationAttributes extends GeneralAttributes {
  /** Dimensión a la que pertenece la ubicación. */
  dimension: Dimension;
  /** Tipo de ubicación (ciudad, planeta, espacio, etc.). */
  type: string;
  /** Población aproximada de la ubicación. */
  aproxPopulation: number;
  /** Descripción de la ubicación. */
  description: string;
}