import { TravelAttributes } from "../interfaces/ITravelAttributes.js";
import { Character } from "./Character.js";
import { Dimension } from "./Dimension.js";

/**
 * Clase que representa el viaje de un personaje de una dimension a otra
 */
export class Travel implements TravelAttributes {
  /**
   * 
   * @param originDimension 
   * @param destinyDimension 
   * @param character 
   * @param date 
   * @param motive 
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