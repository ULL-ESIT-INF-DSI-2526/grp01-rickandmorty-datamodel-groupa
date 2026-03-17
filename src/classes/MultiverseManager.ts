//Si eliminamos una dimension, eliminamos todos los personajes y localizaciones que pertenecen a esa dimension
//Si eliminamos una dimension, como lo hacemos, la marcamos como destruida y la eliminamos de la db o que
import { ISearchElements } from "../interfaces/ISearchElements.js";
import { IAdd } from "../interfaces/IAdd.js";
import { IRemove } from "../interfaces/IRemove.js";
import { IModify } from "../interfaces/IModify.js";
import { Dimension } from "./Dimension.js";
import { Location } from "./Location.js";
import { Invention } from "./Invention.js";
import { Character } from "./Character.js";
import { Species } from "./Species.js";
import { ICharacterCriteria } from "../interfaces/ICharacterCriteria.js";
import { SortMode } from "../types/SortMode.js";
import { SortOrder } from "../types/SortOrder.js";
import { IInventionCriteria } from "../interfaces/IInventionCriteria.js";
import { ILocationCriteria } from "../interfaces/ILocationCriteria.js";
import { JSONFilePreset } from "lowdb/node";
import { db } from "../database/database.js";

//Falta implementar IModify
export class MultiverseManager implements IAdd, IRemove, ISearchElements {
    // dimensions: Dimension[] = [];
    // locations: Location[] = [];
    // characters: Character[] = [];
    // species: Species[] = [];
    // inventions: Invention[] = [];

    // constructor(){}

    async addCharacter(new_character: Character) { 
        const exist = db.data.characters.some(c => c.id === new_character.id);
        const dimension_exist = db.data.dimensions.some(d => d.id === new_character.originDimension.id);
        const specie_exist = db.data.species.some(s => s.id === new_character.species.id);

        if (exist) throw new Error(`Character with id ${new_character.id} already exists.`);
        if (!dimension_exist) throw new Error("The dimension of the location doesn't exist.");
        if (!specie_exist) throw new Error("The specie of the character doesn't exist.");
        
        db.data.characters.push(new_character);
        await db.write();
    }

    async addDimension(new_dimension: Dimension) { 
        const exist = db.data.dimensions.some(d => d.id === new_dimension.id);
        if (exist) throw new Error(`Dimension with id ${new_dimension.id} already exists.`);
        db.data.dimensions.push(new_dimension);
        await db.write(); 
    }

    async addInvention(new_invention: Invention) { 
        const exist = db.data.inventions.some(i => i.id === new_invention.id);
        const inventor_exist = db.data.characters.some(c => c.id === new_invention.inventor.id);
        if (exist) throw new Error(`Invention with id ${new_invention.id} already exists.`);
        if (!inventor_exist) throw new Error ("The inventor of the invention doesn't exist.");
        db.data.inventions.push(new_invention);
        await db.write();
    }

    async addLocation(new_location: Location) {
        const exist = db.data.locations.some(l => l.id === new_location.id);
        const dimension_exist = db.data.dimensions.some(d => d.id === new_location.dimension.id);
        if (exist) throw new Error(`Location with id ${new_location.id} already exists.`);
        if (!dimension_exist) throw new Error("The dimension of the location doesn't exist.");
        db.data.locations.push(new_location);
        await db.write();
    }
    
    async addSpecie(new_specie: Species) {
        const exist = db.data.species.some(s => s.id === new_specie.id);
        const dimension_exist = db.data.dimensions.some(d => d.id === new_specie.origin.id);
        if (!dimension_exist) throw new Error("The origin dimension of the specie doesn't exist.");
        if (exist) throw new Error(`Specie with id ${new_specie.id} already exists.`);
        db.data.species.push(new_specie);
        await db.write();
    }

    async removeCharacter(id: string) { 
        db.data.characters = db.data.characters.filter(c => c.id != id);
        await db.write();
    }

    async removeDimension(id: string) { 
        db.data.dimensions = db.data.dimensions.filter(d => d.id != id);
        await db.write();
    }

    async removeInvention(id: string) { 
        db.data.inventions = db.data.inventions.filter(i => i.id != id);
        await db.write();
    }
    
    async removeLocation(id: string) { 
        db.data.locations = db.data.locations.filter(l => l.id != id);
        await db.write();
    }
    
    async removeSpecie(id: string) { 
        db.data.species = db.data.species.filter(s => s.id != id);
        await db.write();
    }

    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[] {
        let characters = [];
        if (db.data.characters.length === 0) characters = db.data.characters;
        else return [];

        let found_characters: Character[] = [];     

        found_characters = characters.filter(c => {
            if (criteria.name && c.name != criteria.name) return false;
            if (criteria.affiliation && c.affiliation != criteria.affiliation) return false;
            if (criteria.specie && c.species != criteria.specie) return false;
            if (criteria.state && c.state != criteria.state ) return false;
            if (criteria.originDimension && c.originDimension.id != criteria.originDimension.id) return false;
            return true;  
        });

        if (mode == "intelligence") {
            if (order == "asc") found_characters.sort((a, b) => a.inteligenceLevel - b.inteligenceLevel);
            else found_characters.sort((a, b) => b.inteligenceLevel - a.inteligenceLevel);
        }
        else if (mode == "name") {
            if (order == "asc") found_characters.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            else found_characters.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        }

        return found_characters;
    }

    searchInventions(criteria: IInventionCriteria): Invention[] {
        let inventions = [];
        if (db.data.inventions.length === 0) inventions = db.data.inventions;
        else return [];
        
        let found_inventions: Invention[] = [];

        found_inventions = inventions.filter(i => {
            if (criteria.name && criteria.name != i.name) return false;
            if (criteria.dangerLevel && criteria.dangerLevel != i.dangerLevel) return false;
            if (criteria.inventor && criteria.inventor.id != i.inventor.id) return false;
            if (criteria.type && criteria.type != i.type) return false;
            return true;
        });

        return found_inventions;
    }

    searchLocations(criteria: ILocationCriteria): Location[] {
        let locations = [];
        if (db.data.locations.length === 0) locations = db.data.locations;
        else return [];
        let found_locations: Location[] = [];

        found_locations = locations.filter(l => {
            if (criteria.dimension && criteria.dimension.id != l.dimension.id) return false;
            if (criteria.name && criteria.name != l.name) return false;
            if (criteria.type && criteria.type != l.type) return false;
            return true;
        });

        return found_locations;
    }
    
    searchAlternativeLocationOfACharacter(name: string): Dimension[] {
        let characters = [];
        if (db.data.characters.length === 0) characters = db.data.characters;
        else return [];

        let founded_dimensions: Dimension[] = [];
        let chars: Character[] = [];

        chars = characters.filter(c => c.name == name);
        chars.forEach(c => founded_dimensions.push(c.originDimension) );

        return founded_dimensions;
    }
}

