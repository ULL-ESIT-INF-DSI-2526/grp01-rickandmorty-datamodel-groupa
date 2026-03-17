import { LocationAttributes } from "../interfaces/ILocationAttributes.js";
import { Dimension } from "./Dimension.js";

export class Location implements LocationAttributes {
  constructor(
    public id: string,
    public name: string,
    public dimension: Dimension,
    public type: string,
    public aproxPopulation: number,
    public description: string
  ) {
    
  }
}