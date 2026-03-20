import { Character } from "../../classes/Character.js";
import { Dimension } from "../../classes/Dimension.js";

export interface TravelAttributes {
  originDimension: Dimension;
  destinyDimension: Dimension;
  character: Character;
  date: Date;
  motive: string;
}