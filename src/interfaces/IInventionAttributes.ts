import { Character } from "../classes/Character.js";
import { GeneralAttributes } from "./IGeneralAttributes.js";

export interface InventionAttributes extends GeneralAttributes {
  inventor: Character;
  type: string;
  dangerLevel: number;
  description: string;
}