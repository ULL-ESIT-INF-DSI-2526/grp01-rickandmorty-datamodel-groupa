import { CharacterAttributes } from "../interfaces/ICharacterAttributes.js";
import { CharacterState } from "../types/CharacterState.js";
import { Dimension } from "./Dimension.js";
import { Species } from "./Species.js";

export class Character implements CharacterAttributes {
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