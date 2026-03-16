import { ISearchElements } from "../interfaces/ISearchElements";
import { IAdd } from "../interfaces/IAdd";
import { IRemove } from "../interfaces/IRemove";
import { IModify } from "../interfaces/IModify";
import { Dimension } from "./Dimension";
import { Location } from "./Location";
import { Invention } from "./Invention";
import { Character } from "./Character";
import { Species } from "./Species";
import { ICharacterCriteria } from "../interfaces/ICharacterCriteria";
import { SortMode } from "../types/SortMode";
import { SortOrder } from "../types/SortOrder";
import { IInventionCriteria } from "../interfaces/IInventionCriteria";
import { ILocationCriteria } from "../interfaces/ILocationCriteria";


//Falta implementar IModify
export class MultiverseManager implements IAdd, IRemove, ISearchElements {
    dimensions: Dimension[] = [];
    locations: Location[] = [];
    characters: Character[] = [];
    species: Species[] = [];
    inventions: Invention[] = [];

    constructor(){}

    addCharacter(new_character: Character): void { this.characters.push(new_character); }
    addDimension(new_dimension: Dimension): void { this.dimensions.push(new_dimension); }
    addInvention(new_invention: Invention): void { this.inventions.push(new_invention); }
    addLocation(new_location: Location): void {this.locations.push(new_location); }
    addSpecie(new_specie: Species): void {this.species.push(new_specie); }

    removeCharacter(id: string): void { this.characters.filter(c => c.id != id); }
    removeDimension(id: string): void { this.dimensions.filter(d => d.id != id); }
    removeInvention(id: string): void { this.inventions.filter(i => i.id != id); }
    removeLocation(id: string): void { this.locations.filter(l => l.id != id); }
    removeSpecie(id: string): void { this.species.filter(s => s.id != id); }


    searchCharacters(criteria: ICharacterCriteria, mode: SortMode, order: SortOrder): Character[] {
        let found_characters: Character[] = [];

        found_characters = this.characters.filter(c => {
            if (criteria.name && c.name != criteria.name) return false;
            if (criteria.affiliation && c.affiliation != criteria.affiliation) return false;
            if (criteria.specie && c.species != criteria.specie) return false;
            if (criteria.state && c.state != criteria.state ) return false;
            if (criteria.originDimension && c.originDimension.id != criteria.originDimension.id) return false;
            return true;  
        });

        if (mode == "intelligence") {
            if (order == "asc") found_characters.sort((a, b) => a.inteligenceLevel - b.inteligenceLevel);
            else found_characters.sort((a, b) => a.inteligenceLevel - b.inteligenceLevel);
        }
        else if (mode == "name") {
            if (order == "asc") found_characters.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            else found_characters.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        }

        return found_characters;
    }

    searchInventions(criteria: IInventionCriteria): Invention[] {
        let found_inventions: Invention[] = [];

        found_inventions = this.inventions.filter(i => {
            if (criteria.name && criteria.name != i.name) return false;
            if (criteria.dangerLevel && criteria.dangerLevel != i.dangerLevel) return false;
            if (criteria.inventor && criteria.inventor.id != i.inventor.id) return false;
            if (criteria.type && criteria.type != i.type) return false;
            return true;
        });

        return found_inventions;
    }

    searchLocations(criteria: ILocationCriteria): Location[] {
        let found_locations: Location[] = [];

        found_locations = this.locations.filter(l => {
            if (criteria.dimension && criteria.dimension.id != l.dimension.id) return false;
            if (criteria.name && criteria.name != l.name) return false;
            if (criteria.type && criteria.type != l.type) return false;
            return true;
        });

        return found_locations;
    }
    
    searchAlternativeLocationOfACharacter(name: string): Dimension[] {
        let founded_dimensions: Dimension[] = [];
        let chars: Character[] = [];

        chars = this.characters.filter(c => c.name == name);
        chars.forEach(c => founded_dimensions.push(c.originDimension) );

        return founded_dimensions;
    }

}

