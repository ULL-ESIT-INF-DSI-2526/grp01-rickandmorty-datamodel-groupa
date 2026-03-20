import { Dimension } from "../../classes/Dimension.js";
import { GeneralAttributes } from "./IGeneralAttributes.js";

export interface LocationAttributes extends GeneralAttributes {
  dimension: Dimension;
  type: string;
  aproxPopulation: number;
  description: string;
}