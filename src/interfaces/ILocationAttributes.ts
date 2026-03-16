import { Dimension } from "../classes/Dimension";
import { GeneralAttributes } from "./IGeneralAttributes";

export interface LocationAttributes extends GeneralAttributes {
  dimension: Dimension;
  type: string;
  aproxPopulation: number;
  description: string;
}