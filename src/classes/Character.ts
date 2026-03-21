import { CharacterAttributes } from "../interfaces/Attributes/ICharacterAttributes.js";
import { CharacterState } from "../types/CharacterState.js";
import { Dimension } from "./Dimension.js";
import { Species } from "./Species.js";

/**
 * Clase que representa un personaje en el multiverso de Rick and Morty
 */
export class Character implements CharacterAttributes {
  /**
   * Constructor de la clase Character.
   * @param id - Identificador único del personaje.
   * @param name - Nombre del personaje.
   * @param species - Especie a la que pertenece el personaje.
   * @param originDimension - Dimensión de origen del personaje.
   * @param state - Estado actual del personaje.
   * @param affiliation - Afiliación del personaje (Ejemplo: Alianza, Enemigos, etc).
   * @param inteligenceLevel - Nivel de inteligencia del personaje (rango [1-10]).
   * @param description - Descripción del personaje, incluyendo características relevantes, historia, etc.
   * @throws {Error} Si el `inteligenceLevel` no está en el rango permitido (1-10).
   */
  constructor(
    public id: string,
    public name: string,
    public species: Species,
    public originDimension: Dimension,
    public state: CharacterState,
    public affiliation: string,
    public inteligenceLevel: number,
    public description: string
  ) {
    if (inteligenceLevel < 1 || inteligenceLevel > 10) {
      throw new Error("El nivel de inteligencia debe de estar en el rango [1-10]")
    }
  }
}