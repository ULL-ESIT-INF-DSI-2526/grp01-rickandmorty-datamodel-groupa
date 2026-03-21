import { TravelAttributes } from "../interfaces/Attributes/ITravelAttributes.js";
import { Character } from "./Character.js";
import { Dimension } from "./Dimension.js";

/**
 * Clase que representa el viaje de un personaje de una dimension a otra
 */
export class Travel implements TravelAttributes {
  /**
   * Constructor de la clase Travel que recibe los atributos necesarios para crear un viaje
   * @param id - Identificador único del viaje
   * @param originDimension - Dimensión de origen del viaje
   * @param destinyDimension - Dimensión de destino del viaje
   * @param character - Personaje que realiza el viaje
   * @param date - Fecha del viaje
   * @param motive - Motivo del viaje
   */
  constructor(
    public id: string,
    public originDimension: Dimension,
    public destinyDimension: Dimension,
    public character: Character,
    public date: Date,
    public motive: string
  ) {}
}