import { Dimension } from "../classes/Dimension";
import { GeneralAttributes } from "./IGeneralAttributes";

/**
 * Define los atributos específicos que componen a una especie dentro del multiverso.
 * Extiende las propiedades básicas (id, name) de GeneralAttributes.
 */
export interface SpeciesAttributes extends GeneralAttributes {
  /** Dimensión de origen o mundo natal de la especie. */
  origin: Dimension;

  /** Clasificación biológica o estructural de la especie. */
  type: string;

  /** Esperanza de vida media en años terrestres estándar. */
  lifeExpectancy: number;

  /** Rasgos biológicos, culturales o conductuales más relevantes. */
  description: string;
}