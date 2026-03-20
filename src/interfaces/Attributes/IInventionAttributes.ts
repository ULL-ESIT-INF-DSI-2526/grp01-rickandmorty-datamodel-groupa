import { Character } from "../classes/Character.js";
import { GeneralAttributes } from "./Attributes/IGeneralAttributes.js";
import { Location } from "../classes/Location.js";

export interface InventionAttributes extends GeneralAttributes {
  inventor: Character;
  type: string;
  dangerLevel: number;
  description: string;
  inventionLocation: Location; 
}