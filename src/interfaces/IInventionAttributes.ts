import { Character } from "../classes/Character";
import { GeneralAttributes } from "./IGeneralAttributes";

export interface InventionAttributes extends GeneralAttributes {
  inventor: Character;
  type: string;
  dangerLevel: number;
  description: string;
}