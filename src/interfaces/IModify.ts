import { DimensionAttributes } from "./Attributes/IDimensionAttributes.js";
import { InventionAttributes } from "./Attributes/IInventionAttributes.js";
import { CharacterAttributes } from "./Attributes/ICharacterAttributes.js";
import { SpeciesAttributes } from "./Attributes/ISpeciesAttributes.js";
import { LocationAttributes } from "./Attributes/ILocationAttributes.js";

export interface IModify {
    modifyDimension(id: string, modifyAttributes: Partial<DimensionAttributes>): void;
    modifyLocation(id: string, modifyAttributes: Partial<LocationAttributes>): void;
    modifyCharacter(id:string, modifyAttributes: Partial<CharacterAttributes>): void;
    modifySpecie(id:string, modifyAttributes: Partial<SpeciesAttributes>): void;
    modifyInvention(id: string, modifyAttributes: Partial<InventionAttributes>): void;
}