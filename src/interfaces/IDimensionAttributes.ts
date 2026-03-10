import { GeneralAttributes } from "./IGeneralAttributes";
import { DimensionState } from "../types/DimensionState";
/**
 * Representa los atributos que definen una Dimensión.
 * 
 * Esta interfaz describe la estructura de los datos necesarios
 * para crear o representar una dimensión dentro del sistema.
 */
export interface DimensionAttributes extends GeneralAttributes {
  /** Estado actual de la dimensión */
  state: DimensionState;

  /** Nivel tecnológico de la dimensión */
  technologyLevel: number;
  
  /** Descripción adicional de la dimensión */
  description: string;
}