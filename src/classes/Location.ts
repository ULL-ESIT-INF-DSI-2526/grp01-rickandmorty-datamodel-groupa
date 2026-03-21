import { LocationAttributes } from "../interfaces/Attributes/ILocationAttributes.js";
import { Dimension } from "./Dimension.js";

/**
 * Clase que representa una ubicación dentro del sistema.
 */
export class Location implements LocationAttributes {
  /**
   * Constructor de la clase Location.
   * @param id - Identificador único de la ubicación.
   * @param name - Nombre de la ubicación.
   * @param dimension - Dimensión a la que pertenece la ubicación.
   * @param type - Tipo de ubicación (Ejemplo: Ciudad, Planeta, Edificio, etc).
   * @param aproxPopulation - Población aproximada de la ubicación.
   * @param description - Descripción de la ubicación, incluyendo características relevantes, historia, etc.
   */
  constructor(
    public id: string,
    public name: string,
    public dimension: Dimension,
    public type: string,
    public aproxPopulation: number,
    public description: string
  ) {
    
  }
}