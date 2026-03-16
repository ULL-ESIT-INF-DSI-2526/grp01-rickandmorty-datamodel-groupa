import { InventionAttributes } from "../interfaces/IInventionAttributes";
import { Character } from "./Character";

export class Invention implements InventionAttributes {
  constructor(
    public id: string,
    public name: string,
    public inventor: Character,
    public type: string,
    public dangerLevel: number,
    public description: string 
  ) {
    if (dangerLevel < 1 || dangerLevel > 10) {
      throw new Error("El nivel de peligro debe de estar en el rango [1-10]")
    }
  }
}