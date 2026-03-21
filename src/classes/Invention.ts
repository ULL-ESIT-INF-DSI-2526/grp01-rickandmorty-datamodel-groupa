import { InventionAttributes } from "../interfaces/Attributes/IInventionAttributes.js";
import { Character } from "./Character.js";
import { Location } from "./Location.js";

/**
 * Clase que representa una invención dentro del sistema.
 */
export class Invention implements InventionAttributes {
  /**
   * Constructor de la clase Invention.
   * @param id - Identificador único de la invención.
   * @param name - Nombre de la invención.
   * @param inventor - Personaje que inventó la invención.
   * @param type - Tipo de invención (Ejemplo: Máquina, Dispositivo, etc).
   * @param dangerLevel - Nivel de peligro asociado a la invención (rango [1-10]).
   * @param description - Descripción de la invención, incluyendo características relevantes, historia, etc.
   * @param inventionLocation - Localización donde se creó la invención.
   */
  constructor(
    public id: string,
    public name: string,
    public inventor: Character,
    public type: string,
    public dangerLevel: number,
    public description: string,
    public inventionLocation: Location 
  ) {
    if (dangerLevel < 1 || dangerLevel > 10) {
      throw new Error("El nivel de peligro debe de estar en el rango [1-10]")
    }
  }
}