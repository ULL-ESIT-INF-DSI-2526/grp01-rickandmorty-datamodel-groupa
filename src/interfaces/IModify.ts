import { DimensionAttributes } from "./IDimensionAttributes.js";
import { InventionAttributes } from "./IInventionAttributes.js";
import { CharacterAttributes } from "./ICharacterAttributes.js";
import { SpeciesAttributes } from "./ISpeciesAttributes.js";
import { LocationAttributes } from "./ILocationAttributes.js";

export interface IModify {
    modifyDimension(id: string, modifyAttributes: Partial<DimensionAttributes>): void;
    modifyLocation(id: string, modifyAttributes: Partial<LocationAttributes>): void;
    modifyCharacter(id:string, modifyAttributes: Partial<CharacterAttributes>): void;
    modifySpecie(id:string, modifyAttributes: Partial<SpeciesAttributes>): void;
    modifyInvention(id: string, modifyAttributes: Partial<InventionAttributes>): void;
}