import { LocationAttributes } from "../interfaces/ILocationAttributes";
import { Dimension } from "./Dimension";

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