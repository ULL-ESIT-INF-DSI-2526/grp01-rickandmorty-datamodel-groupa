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
import { ICharacterCriteria } from "../interfaces/Criteria/ICharacterCriteria.js";
import { SortMode } from "../types/SortMode.js";
import { SortOrder } from "../types/SortOrder.js";
import { IInventionCriteria } from "../interfaces/Criteria/IInventionCriteria.js";
import { ILocationCriteria } from "../interfaces/Criteria/ILocationCriteria.js";
import { CharacterAttributes } from "../interfaces/Attributes/ICharacterAttributes.js";
import { DimensionAttributes } from "../interfaces/Attributes/IDimensionAttributes.js";
import { SpeciesAttributes } from "../interfaces/Attributes/ISpeciesAttributes.js";
import { InventionAttributes } from "../interfaces/Attributes/IInventionAttributes.js";
import { LocationAttributes } from "../interfaces/Attributes/ILocationAttributes.js";
import { Travel } from "./Travel.js"
import { ITravelCriteria } from "../interfaces/Criteria/ITravelCriteria.js";
import { Experiment } from "./Experiment.js";

/**
 * Clase que representa el gestor del multiverso, encargado de administrar las dimensiones,
 * personajes, especies, inventos, ubicaciones y viajes. Implementa las interfaces IAdd,
 * IRemove, ISearchElements e IModify para realizar las operaciones correspondientes sobre los elementos del multiverso.
 */
export class MultiverseManager implements IAdd, IRemove, ISearchElements, IModify {
    /**Array que almacena los personajes del multiverso. */
    private _characters: Character[];
    /**Array que almacena las dimensiones del multiverso. */
    private _dimensions: Dimension[];
    /**Array que almacena las especies del multiverso. */
    private _species: Species[];
    /**Array que almacena los inventos del multiverso. */
    private _inventions: Invention[];
    /**Array que almacena las ubicaciones del multiverso. */
    private _locations: Location[];
    /**Array que almacena los viajes del multiverso. */
    private _travels: Travel[];
    /**Array que almacena experimentos del multiverso */
    private _experiments: Experiment[];

    /**Instancia única de la clase MultiverseManager para implementar el patrón Singleton. */
    private static multiverseManager: MultiverseManager;

    /**
     * Constructor privado para evitar la creación de múltiples instancias de MultiverseManager. 
     * Inicializa los arrays de personajes, dimensiones, especies, inventos, ubicaciones y viajes.
     */
    private constructor() {
        this._characters = [];
        this._dimensions = [];
        this._species = [];
        this._inventions = [];
        this._locations = [];
        this._travels = [];
        this._experiments = [];
    } 

    /**
     * Obtiene la instancia única de la clase MultiverseManager.
     * @returns La instancia de MultiverseManager.
     */
    public static getInstance(): MultiverseManager {
      if (!MultiverseManager.multiverseManager) {
        MultiverseManager.multiverseManager = new MultiverseManager();
      }
      return MultiverseManager.multiverseManager;
    }

    /**
     * Método creado para testing. De otra manera en cada test se compartirian todas las inserciones
     * de otros tests.
     */
    public static resetInstance(): void {
        MultiverseManager.multiverseManager = new MultiverseManager();
    }

    get dimensions(): Dimension[] { return this._dimensions; }
    get characters(): Character[] { return this._characters; }
    get species(): Species[] { return this._species; }
    get inventions(): Invention[] {return this._inventions; }
    get locations(): Location[] { return this._locations; }
    get travels(): Travel[] { return this._travels }
    get experiments(): Experiment[] { return this._experiments }

    /**
     * Agrega un nuevo personaje al multiverso.
     * @param new_character - El personaje a agregar.
     */
    addCharacter(new_character: Character): void { 
        const exist = this.characters.some(c => c.id === new_character.id);
        const dimension_exist = this._dimensions.some(d => d.id === new_character.originDimension.id);
        const specie_exist = this.species.some(s => s.id === new_character.species.id);

        if (exist) throw new Error(`El personaje con id ${new_character.id} ya existe.`);
        if (!dimension_exist) throw new Error("La dimensión de origen del personaje no existe.");
        if (!specie_exist) throw new Error("La especie del personaje no existe.");
        
        this._characters.push(new_character);
    }

    /**
     * Agrega una nueva dimensión al multiverso.
     * @param new_dimension - La dimensión a agregar.
     */
    addDimension(new_dimension: Dimension): void { 
        const exist = this._dimensions.some(d => d.id === new_dimension.id);
        if (exist) throw new Error(`La dimensión con id ${new_dimension.id} ya existe.`);
        this._dimensions.push(new_dimension);
    }

    /**
     * Agrega un nuevo invento al multiverso.
     * @param new_invention - El invento a agregar.
     */
    addInvention(new_invention: Invention): void { 
        const exist = this._inventions.some(i => i.id === new_invention.id);
        const inventor_exist = this._characters.some(c => c.id === new_invention.inventor.id);
        if (exist) throw new Error(`El invento con id ${new_invention.id} ya existe.`);
        if (!inventor_exist) throw new Error("El inventor del invento no existe.");
        this._inventions.push(new_invention);
    }

    /**
     * Agrega una nueva ubicación al multiverso.
     * @param new_location - La ubicación a agregar.
     */
    addLocation(new_location: Location): void {
        const exist = this._locations.some(l => l.id === new_location.id);
        const dimension_exist = this._dimensions.some(d => d.id === new_location.dimension.id);
        if (exist) throw new Error(`La ubicación con id ${new_location.id} ya existe.`);
        if (!dimension_exist) throw new Error("La dimensión de la ubicación no existe.");
        this._locations.push(new_location);
    }
    
    /**
     * Agrega una nueva especie al multiverso.
     * @param new_specie - La especie a agregar.
     */
    addSpecie(new_specie: Species): void {
        const exist = this._species.some(s => s.id === new_specie.id);
        const dimension_exist = this._dimensions.some(d => d.id === new_specie.origin.id);
        if (!dimension_exist) throw new Error("La dimensión de origen de la especie no existe.");
        if (exist) throw new Error(`La especie con id ${new_specie.id} ya existe.`);
        this._species.push(new_specie);
    }

    /**
     * Agrega un nuevo viaje al multiverso.
     * @param new_travel - El viaje a agregar.
     */
    addTravel(new_travel: Travel):void {
        const exist = this._travels.some(s => s.id === new_travel.id);
        const character_exist = this._characters.some(c => c.id === new_travel.character.id);
        const dimensionOrigin_exist = this._dimensions.some(d => d.id === new_travel.originDimension.id);
        const dimensionDestiny_exist = this._dimensions.some(d => d.id === new_travel.destinyDimension.id);
        if (exist) throw new Error(`El viaje con id ${new_travel.id} ya existe.`);
        if (!character_exist) throw new Error(`El personaje que realiza el viaje no existe`);
        if (!dimensionOrigin_exist) throw new Error("La dimensión de origen del viaje no existe.");
        if (!dimensionDestiny_exist) throw new Error("La dimensión de destino del viaje no existe.");
        this._travels.push(new_travel);
    }

    /**
     * Agrega un nuevo experimento al multiverso.
     * @param new_experiment - El experimento a agregar.
     */
    addExperiment(new_experiment: Experiment): void {
        const exist = this._experiments.some(e => e.id === new_experiment.id);
        const character_exist = this._characters.some(c => c.id === new_experiment.creator.id);
        const dimension_exist = this._dimensions.some(dim => dim.id === new_experiment.originDimension.id);
        if (exist) throw new Error(`El experimento con id ${new_experiment.id} ya existe.`);
        if (!character_exist) throw new Error("El creador del experimento no existe.");
        if (!dimension_exist) throw new Error("La dimensión de origen del experimento no existe.");
        this._experiments.push(new_experiment);
    }

    /**
     * Elimina un personaje del multiverso.
     * @param id - El ID del personaje a eliminar.
     */
    removeCharacter(id: string): void { 
        this._characters.map(c => {
            if (c.id == id) c.state = 'dead';
        });
    }

    /**
     * Elimina una dimensión del multiverso.
     * @param id - El ID de la dimensión a eliminar.
     */
    removeDimension(id: string): void { 
        this._dimensions.map(d => {
            if (d.id == id) d.state = 'destroyed';
        });
        this._locations = this._locations.filter(l => l.dimension.id != id );
    }

    /**
     * Elimina un invento del multiverso.
     * @param id - El ID del invento a eliminar.
     */
    removeInvention(id: string): void { 
        this._inventions = this._inventions.filter(i => i.id != id);
    }
    
    /**
     * Elimina una ubicación del multiverso.
     * @param id - El ID de la ubicación a eliminar.
     */
    removeLocation(id: string): void { 
        this._locations = this._locations.filter(l => l.id != id);
    }
    
    /**
     * Elimina una especie del multiverso, así como todos los personajes que pertenezcan a esa especie.
     * @param id - El ID de la especie a eliminar.
     */
    removeSpecie(id: string): void { 
        this._species = this._species.filter(s => s.id != id);
        this._characters = this._characters.filter(c => c.species.id != id);        
    }

    /**
     * Elimina un viaje del multiverso.
     * @param id - El ID del viaje a eliminar.
     */
    removeTravel(id: string): void {
        this._travels = this._travels.filter(t => t.id != id);
    }

    /**
     * Elimina un experimento del multiverso.
     * @param id - El ID del experimento a eliminar.
     */
    removeExperiment(id: string): void {
        this._experiments = this._experiments.filter(e => e.id != id);
    }

    /**
     * Modifica los atributos de un personaje en el multiverso.
     * @param id - El ID del personaje a modificar.
     * @param modifyAttributes - Los atributos a modificar.
     */
    modifyCharacter(id: string, modifyAttributes: Partial<CharacterAttributes>): void {
        const found_character = this._characters.find(c => c.id == id);
        if (!found_character) throw new Error ('El personaje que desea cambiar no se encuentra en la colección');
        
        if (modifyAttributes.species !== undefined) found_character.species = modifyAttributes.species;
        if (modifyAttributes.state != undefined ) found_character.state = modifyAttributes.state;
        if (modifyAttributes.originDimension != undefined ) found_character.originDimension = modifyAttributes.originDimension;
        if (modifyAttributes.affiliation != undefined) found_character.affiliation = modifyAttributes.affiliation;
        if (modifyAttributes.inteligenceLevel != undefined) found_character.inteligenceLevel = modifyAttributes.inteligenceLevel;
        if (modifyAttributes.description != undefined) found_character.description = modifyAttributes.description;
    }

    /**
     * Modifica los atributos de una dimensión en el multiverso.
     * @param id - El ID de la dimensión a modificar.
     * @param modifyAttributes - Los atributos a modificar.
     */
    modifyDimension(id: string, modifyAttributes: Partial<DimensionAttributes>): void {
        const founded_dimensions = this._dimensions.find(d => d.id == id);
        if (!founded_dimensions) throw new Error ('La dimensión que desea cambiar no se encuentra en la colección');
        
        if (modifyAttributes.state != undefined ) founded_dimensions.state = modifyAttributes.state;
        if (modifyAttributes.technologyLevel != undefined) founded_dimensions.technologyLevel = modifyAttributes.technologyLevel;
        if (modifyAttributes.description != undefined) founded_dimensions.description = modifyAttributes.description;
    }

    /**
     * Modifica los atributos de una especie en el multiverso.
     * @param id - El ID de la especie a modificar.
     * @param modifyAttributes - Los atributos a modificar.
     */
    modifySpecie(id: string, modifyAttributes: Partial<SpeciesAttributes>): void {
        const founded_species = this._species.find(s => s.id == id);
        if (!founded_species) throw new Error ('La especie que desea cambiar no se encuentra en la colección');
        
        if (modifyAttributes.origin != undefined ) founded_species.origin = modifyAttributes.origin;
        if (modifyAttributes.type != undefined) founded_species.type = modifyAttributes.type;
        if (modifyAttributes.description != undefined) founded_species.description = modifyAttributes.description;
        if (modifyAttributes.lifeExpectancy != undefined) founded_species.lifeExpectancy = modifyAttributes.lifeExpectancy;
    }

    /**
     * Modifica los atributos de un invento en el multiverso.
     * @param id - El ID del invento a modificar.
     * @param modifyAttributes - Los atributos a modificar.
     */
    modifyInvention(id: string, modifyAttributes: Partial<InventionAttributes>): void {
        const founded_inventions = this._inventions.find(i => i.id == id);
        if (!founded_inventions) throw new Error ('El invento que desea cambiar no se encuentra en la colección');
        
        if (modifyAttributes.inventor != undefined ) founded_inventions.inventor = modifyAttributes.inventor;
        if (modifyAttributes.dangerLevel != undefined) founded_inventions.dangerLevel = modifyAttributes.dangerLevel;
        if (modifyAttributes.type != undefined) founded_inventions.type = modifyAttributes.type; 
        if (modifyAttributes.description != undefined) founded_inventions.description = modifyAttributes.description;
        if (modifyAttributes.inventionLocation != undefined) founded_inventions.inventionLocation = modifyAttributes.inventionLocation;
    }
    
    /**
     * Modifica los atributos de una ubicación en el multiverso.
     * @param id - El ID de la ubicación a modificar.
     * @param modifyAttributes - Los atributos a modificar.
     */
    modifyLocation(id: string, modifyAttributes: Partial<LocationAttributes>): void {
        const founded_locations = this._locations.find(l => l.id == id);
        if (!founded_locations) throw new Error ('La localizacion que desea cambiar no se encuentra en la colección');
        
        if (modifyAttributes.dimension != undefined ) founded_locations.dimension = modifyAttributes.dimension;
        if (modifyAttributes.type != undefined) founded_locations.type = modifyAttributes.type;
        if (modifyAttributes.description != undefined) founded_locations.description = modifyAttributes.description;
        if (modifyAttributes.aproxPopulation != undefined) founded_locations.aproxPopulation = modifyAttributes.aproxPopulation;
    }

    /**
     * Busca personajes en el multiverso según criterios especificados.
     * @param criteria - Los criterios de búsqueda para los personajes.
     * @param mode - El modo de ordenamiento para los resultados (por inteligencia o por nombre).
     * @param order - El orden de ordenamiento (ascendente o descendente).
     * @returns Un array de personajes que cumplen con los criterios de búsqueda,
     * ordenados según el modo y orden especificados.
     */
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
        } else {
            if (order == "asc") found_characters.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            else found_characters.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        }

        return found_characters;
    }

    /**
     * Busca invenciones en el multiverso según criterios especificados.
     * @param criteria - Los criterios de búsqueda para las invenciones.
     * @returns Un array de invenciones que cumplen con los criterios de búsqueda.
     */
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

    /**
     * Busca ubicaciones en el multiverso según criterios especificados.
     * @param criteria - Los criterios de búsqueda para las ubicaciones.
     * @returns Un array de ubicaciones que cumplen con los criterios de búsqueda.
     */
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

    /**
     * Busca viajes en el multiverso según criterios especificados.
     * @param criteria - Los criterios de búsqueda para los viajes.
     * @returns Un array de viajes que cumplen con los criterios de búsqueda.
     */
    // searchTravel(criteria: ITravelCriteria): Travel[] {
    //   let travels = this.travels;
    //   let found_travels: Travel[] = [];

    //   found_travels = travels.filter(t => {
    //       if (criteria.originDimension && criteria.originDimension.id != t.originDimension.id) return false;
    //       if (criteria.destinyDimension && criteria.destinyDimension.id != t.destinyDimension.id) return false;
    //       if (criteria.character && criteria.character.id != t.character.id) return false;
    //       if (criteria.date && criteria.date != t.date) return false;
    //       return true;
    //   });
    //   return found_travels;
    // }
    
    /**
     * Busca las dimensiones alternativas de un personaje en el multiverso.
     * @param name - El nombre del personaje para el cual se buscan las dimensiones alternativas.
     * @returns Un array de dimensiones que cumplen con los criterios de búsqueda.
     */
    searchAlternativeLocationOfACharacter(name: string): Dimension[] {
      let characters = this._characters;

      let founded_dimensions: Dimension[] = [];
      let chars: Character[] = [];

      chars = characters.filter(c => c.name == name);
      chars.forEach(c => founded_dimensions.push(c.originDimension) );



      return founded_dimensions;
    }

    /**
     * Genera un informe de las dimensiones activas en el multiverso.
     * @returns El informe de dimensiones activas.
     */
    getDimensionReport():string {
      const active = this._dimensions.filter((d) => d.state.toLowerCase() === 'active');
      const report = active.map((d) => ({ "Id": d.id, "TechnologyLevel": d.technologyLevel}));
      let str: string = "";
      report.forEach((el) => {
          str += `Id: ${el.Id}, Tecnology Level: ${el.TechnologyLevel}`;
      });
      console.log("Active Dimension Report");
      console.table(report);
      return str;
    }

    /**
     * Genera un informe de las invenciones peligrosas en el multiverso.
     * @param danger - El nivel de peligro mínimo para incluir en el informe.
     * @returns El informe de invenciones peligrosas.
     */
    getInventionsReport(danger: number): string {
      const dangerous = this._inventions.filter((d) => d.dangerLevel > danger );
      const report = dangerous.map((d) => ({ "Id": d.id, "DangerousLevel": d.dangerLevel, "Localization": d.inventionLocation }));
      let str: string = "";
      report.forEach((el) => {
          str += `Id: ${el.Id}, DangerousLevel: ${el.DangerousLevel}, Localization: ${el.Localization} \n`;
      });
      console.log("Most Dangerous Dimensions Report");
      console.table(report);
      return str;
    }

    /**
     * Genera un informe de los personajes en el multiverso.
     * @returns El informe de personajes.
     */
    getCharacterReport(): string {
      const names: string[] = this._characters.map((c) => c.name);
      const unique = new Set(names);
      const result: [string, number][] = [];

      unique.forEach((el) => {
          const dim = this.searchAlternativeLocationOfACharacter(el);
          result.push([el, dim.length]);
      });

      let str: string = "";
      
      const report = result.filter((d) => d[1] > 1).map(([n, c]) => ({"Character": n, "Versions": c}));
      report.forEach((el) => {
          str += `Character: ${el.Character},  Number of versions: ${el.Versions}`;
      });
      console.log("Character Report");
      console.table(report);
      return str;
    }

    /**
     * Genera un informe del historial de viajes de un personaje en el multiverso.
     * @param character - El personaje para el cual se genera el informe.
     * @returns El informe del historial de viajes.
     */
    getTravelHistoryReport(character: Character): string {
      const report = this.travels.filter((d) => d.character === character);
      let str: string = "";
      report.forEach((el) => {
        str += `Travel: ${el.id}, Character: ${el.character}, Date: ${el.date}, Motive: ${el.motive}, Origin: ${el.originDimension} Destination: ${el.destinyDimension} `;
      });
      console.log(`Travel History of the character: ${character}`);
      console.table(report);
      return str;
    }

    /**
     * Neutraliza una invención, reduciendo su nivel de peligro a cero y apagándolo.
     * @param invention - El invento a neutralizar.
     * @returns Un mensaje indicando el resultado de la operación.
     */
    InventionNeutralization(invention: Invention): string {
      invention.dangerLevel = 0;
      invention.state = 'off';
      let str: string = `El invento ${invention.name} ha sido neutralizado`;
      return str;
    }

    /**
     * Despliega una invención, cambiando su estado a 'on'.
     * @param invention - El invento a desplegar.
     * @returns Un mensaje indicando el resultado de la operación.
     */
    InventionDeployment(invention: Invention): string {
        invention.state = 'on';
        let str: string = `El invento ${invention.name} ha sido desplegado`;
        return str;
    }

    /**
     * Ejecuta un experimento, realizando las acciones correspondientes según el tipo de experimento.
     * @param experiment - El experimento a ejecutar.
     * @param id - El ID necesario para ciertos tipos de experimentos (por ejemplo, para crear una nueva dimensión). Es opcional
     */
    executeExperiment(experiment: Experiment, id?: string) {
      switch(experiment.type) {
        case 'destroyDimension': {
            this.removeDimension(experiment.originDimension.id);  
            break;
        }      
        case 'createDimension': {
            if (!id) throw new Error("Se requiere un id para crear una nueva dimensión.");
            const d: Dimension = new Dimension(id, "Experiment Dimension", "active", 1, `Dimension created by the experiment ${experiment.id}`);
            this.addDimension(d);
            break;
        }
      }
    }
}         