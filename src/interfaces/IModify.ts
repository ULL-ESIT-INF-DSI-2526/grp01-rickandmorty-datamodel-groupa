import { DimensionAttributes } from "./Attributes/IDimensionAttributes.js";
import { InventionAttributes } from "./Attributes/IInventionAttributes.js";
import { CharacterAttributes } from "./Attributes/ICharacterAttributes.js";
import { SpeciesAttributes } from "./Attributes/ISpeciesAttributes.js";
import { LocationAttributes } from "./Attributes/ILocationAttributes.js";

/**
 * Interfaz que define los métodos para modificar las entidades del sistema.
 * Cada método recibe un identificador único y un objeto con los atributos a modificar,
 * permitiendo actualizar solo los campos necesarios sin afectar el resto de la información de la entidad.
 */
export interface IModify {
    /**
     * Modifica los atributos de una dimensión existente.
     * @param id - ID de la dimensión a modificar.
     * @param modifyAttributes - Objeto con los atributos a modificar (puede contener solo los campos que se desean actualizar).
     */
    modifyDimension(id: string, modifyAttributes: Partial<DimensionAttributes>): void;
    /**
     * Modifica los atributos de una localización existente.
     * @param id - ID de la localización a modificar.
     * @param modifyAttributes - Objeto con los atributos a modificar (puede contener solo los campos que se desean actualizar).
     */
    modifyLocation(id: string, modifyAttributes: Partial<LocationAttributes>): void;
    /**
     * Modifica los atributos de un personaje existente.
     * @param id - ID del personaje a modificar.
     * @param modifyAttributes - Objeto con los atributos a modificar (puede contener solo los campos que se desean actualizar).
     */
    modifyCharacter(id:string, modifyAttributes: Partial<CharacterAttributes>): void;
    /**
     * Modifica los atributos de una especie existente.
     * @param id - ID de la especie a modificar.
     * @param modifyAttributes - Objeto con los atributos a modificar (puede contener solo los campos que se desean actualizar).
     */
    modifySpecie(id:string, modifyAttributes: Partial<SpeciesAttributes>): void;
    /**
     * Modifica los atributos de un invento existente.
     * @param id - ID del invento a modificar.
     * @param modifyAttributes - Objeto con los atributos a modificar (puede contener solo los campos que se desean actualizar).
     */
    modifyInvention(id: string, modifyAttributes: Partial<InventionAttributes>): void;
}