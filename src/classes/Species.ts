import { SpeciesAttributes } from "../interfaces/Attributes/ISpeciesAttributes.js";
import { Dimension } from "./Dimension.js";

/**
 * Representa una especie viva o entidad biológica dentro del sistema.
 */
export class Species implements SpeciesAttributes {
  /**
   * Crea una nueva instancia de una especie.
   * @param id - Identificador único.
   * @param name - Nombre de la especie.
   * @param origin - Referencia a la clase Dimension o Location donde se originó.
   * @param type - Clasificación general (Ejemplo: Humanoide, Amorfo, Robótico, Parásito, etc).
   * @param lifeExpectancy - Esperanza de vida media en años.
   * @param description - Rasgos biológicos, culturales o conductuales más relevantes.
   */  
  constructor(
    public id: string,
    public name: string,
    public origin: Dimension,
    public type: string,
    public lifeExpectancy: number,
    public description: string 
  ) {}
}