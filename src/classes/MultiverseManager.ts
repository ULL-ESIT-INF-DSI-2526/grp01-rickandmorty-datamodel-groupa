//Si eliminamos una dimension, eliminamos todos los personajes y localizaciones que pertenecen a esa dimension
//Si eliminamos una dimension, como lo hacemos, la marcamos como destruida y la eliminamos de la db o que
import { ISearchElements } from "../interfaces/ISearchElements.js";
import { IAdd } from "../interfaces/IAdd.js";
import { IRemove } from "../interfaces/IRemove.js";
import { IModify } from "../interfaces/IModify.js";
import { Dimension } from "./Dimension.js";
import { DimensionState } from "../types/DimensionState.js";
import { Location } from "./Location.js";
import { Invention } from "./Invention.js";
import { Character } from "./Character.js";
import { Species } from "./Species.js";
import { ICharacterCriteria } from "../interfaces/ICharacterCriteria.js";
import { SortMode } from "../types/SortMode.js";
import { SortOrder } from "../types/SortOrder.js";
import { IInventionCriteria } from "../interfaces/IInventionCriteria.js";
import { ILocationCriteria } from "../interfaces/ILocationCriteria.js";

export class MultiverseManager implements IAdd, IRemove, ISearchElements {
    private _characters: Character[];
    private _dimensions: Dimension[];
    private _species: Species[];
    private _inventions: Invention[];
    private _locations: Location[];

    constructor() {
        this._characters = [];
        this._dimensions = [];
        this._species = [];
        this._inventions = [];
        this._locations = [];
    } 

    get dimensions(): Dimension[] { return this._dimensions; }
    get characters(): Character[] { return this._characters; }
    get species(): Species[] { return this._species; }
    get inventions(): Invention[] {return this._inventions; }
    get locations(): Location[] { return this._locations; }

addCharacter(new_character: Character) { 
        const exist = this.characters.some(c => c.id === new_character.id);
        const dimension_exist = this._dimensions.some(d => d.id === new_character.originDimension.id);
        const specie_exist = this.species.some(s => s.id === new_character.species.id);

        if (exist) throw new Error(`El personaje con id ${new_character.id} ya existe.`);
        if (!dimension_exist) throw new Error("La dimensión de origen del personaje no existe.");
        if (!specie_exist) throw new Error("La especie del personaje no existe.");
        
        this._characters.push(new_character);
    }

    addDimension(new_dimension: Dimension) { 
        const exist = this._dimensions.some(d => d.id === new_dimension.id);
        if (exist) throw new Error(`La dimensión con id ${new_dimension.id} ya existe.`);
        this._dimensions.push(new_dimension);
    }

    addInvention(new_invention: Invention) { 
        const exist = this._inventions.some(i => i.id === new_invention.id);
        const inventor_exist = this._characters.some(c => c.id === new_invention.inventor.id);
        if (exist) throw new Error(`El invento con id ${new_invention.id} ya existe.`);
        if (!inventor_exist) throw new Error("El inventor del invento no existe.");
        this._inventions.push(new_invention);
    }

    addLocation(new_location: Location) {
        const exist = this._locations.some(l => l.id === new_location.id);
        const dimension_exist = this._dimensions.some(d => d.id === new_location.dimension.id);
        if (exist) throw new Error(`La ubicación con id ${new_location.id} ya existe.`);
        if (!dimension_exist) throw new Error("La dimensión de la ubicación no existe.");
        this._locations.push(new_location);
    }
    
    addSpecie(new_specie: Species) {
        const exist = this._species.some(s => s.id === new_specie.id);
        const dimension_exist = this._dimensions.some(d => d.id === new_specie.origin.id);
        if (!dimension_exist) throw new Error("La dimensión de origen de la especie no existe.");
        if (exist) throw new Error(`La especie con id ${new_specie.id} ya existe.`);
        this._species.push(new_specie);
    }

    removeCharacter(id: string) { 
        this._characters.map(c => {
            if (c.id == id) c.state = 'dead';
        });
    }

    removeDimension(id: string) { 
        this._dimensions.map(d => {
            if (d.id == id) d.state = 'destroyed';
        });
        this._locations = this._locations.filter(l => l.dimension.id != id );
    }

    removeInvention(id: string) { 
        this._inventions = this._inventions.filter(i => i.id != id);
    }
    
    removeLocation(id: string) { 
        this._locations = this._locations.filter(l => l.id != id);
    }
    
    removeSpecie(id: string) { 
        this._species = this._species.filter(s => s.id != id);
        this._characters = this._characters.filter(c => c.species.id != id);        
    }

    // modifyCharacter(id: string, modifyAttributes: Partial<CharacterAttributes>): void {
    //     const found_character = this._characters.find(c => c.id == id);
    //     if (!found_character) throw new Error ('El personaje que desea cambiar no se encuentra en la colección');
        
    //     if (modifyAttributes.species !== undefined) found_character.species = modifyAttributes.species;
    //     if (modifyAttributes.state != undefined ) found_characted.state = modifyAttributes.state;
    //     if (modifyAttributes.originDimension != undefined ) found_character.originDimension = modifyAttributes.originDimension;
    //     if (modifyAttributes.o)
    // }

    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[] {
        let characters = this.characters;

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
        let inventions = this.inventions;
        
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
        let locations = this.locations;
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
        let characters = this._characters;

        let founded_dimensions: Dimension[] = [];
        let chars: Character[] = [];

        chars = characters.filter(c => c.name == name);
        chars.forEach(c => founded_dimensions.push(c.originDimension) );

        return founded_dimensions;
    }

    getDimensionReport():string {
        const active = this._dimensions.filter((d) => { d.state.toLowerCase() === 'active'});
        const report = active.map((d) => ({ "Id": d.id, "TechnologyLevel": d.technologyLevel}));
        let str: string = "";
        report.forEach((el) => {
            str += `Id: ${el.Id}, Tecnology Level: ${el.TechnologyLevel}`;
        });
        console.log("Active Dimension Report");
        console.table(report);
        return str;
    }

    getInventionsReport(danger: number) {
        const dangerous = this._inventions.filter((d) => { d.dangerLevel > danger});
        const report = dangerous.map((d) => ({ "id": d.id, "Dangerpus Level": d.dangerLevel, "Localization": d.inventor.originDimension }));
        console.log("Most Dangerous Dimensions Report");
        console.table(report);
        return report;
    }

    getCharacterReport() {
        const names: string[] = this._characters.map((c) => c.name);
        const unique = new Set(names);
        const result: [string, number][] = [];

        unique.forEach((el) => {
            const dim = this.searchAlternativeLocationOfACharacter(el);
            result.push([el, dim.length]);
        });

        const report = result.filter((d) => d[1] > 1).map(([n, c]) => ({"Character": n, "Versions": c}));
        console.log("Character Report");
        console.table(report);
        return report;
    }
}

