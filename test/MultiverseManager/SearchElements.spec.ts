import { describe, test, expect } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Location } from '../../src/classes/Location.js';
import { Invention } from '../../src/classes/Invention.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';

describe('Search Elements Tests:', () => {
  const dimension: Dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
  const dimension2: Dimension = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");
  const specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
  const multiverseManager = new MultiverseManager();
  const character: Character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
  const character2: Character = new Character("C-002", "Morty Smith", specie, dimension, "alive", "none", 5, "Rick's grandson");
  const character3: Character = new Character("C-003", "Summer Smith", specie, dimension, "alive", "none", 6, "Morty's older sister");
  const character_: Character = new Character("C-0012", "Rick Sanchez", specie, dimension2, "alive", "none", 10, "A genius scientist");
  const location: Location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
  const location2: Location = new Location("L-002", "Earth", dimension, "Planet", 7000000000, "The planet where most of the characters live.");
  const location3: Location = new Location("L-003", "Jerrybore", dimension, "Daycare center", 100, "A daycare center where Jerry works.");
  const invention: Invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions", location);
  const invention2: Invention = new Invention("I-002", "SpaceShip", character, "Vehicle", 9, "A spaceship that allows to travel through space", location);
  const invention3: Invention = new Invention("I-003", "Pickle Rick", character, "Transformation", 7, "A device that allows to transform into a pickle", location);

  // pruebas para buscar personajes
  describe('Metodo searchCharacters', () => {
    test('Buscar un personaje por su nombre', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addCharacter(character2);
      multiverseManager.addCharacter(character3);
      const result = multiverseManager.searchCharacters({name: "Rick Sanchez"}, "name", "asc");
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(character.id);
    });

    test ("Buscar un personaje por su especie y ordenarlo por su nombre de forma descendente", () => {
      const result = multiverseManager.searchCharacters({specie: specie}, "name", "desc");
      expect(result.length).toBe(3);
      expect(result[0].id).toBe(character3.id);
      expect(result[1].id).toBe(character.id);
      expect(result[2].id).toBe(character2.id);
    });

    test ("Buscar un personaje por su estado y ordenarlo por su inteligencia de forma ascendente", () => {
      const result = multiverseManager.searchCharacters({state: "alive"}, "intelligence", "asc");
      expect(result.length).toBe(3);
      expect(result[0].id).toBe(character2.id);
      expect(result[1].id).toBe(character3.id);
      expect(result[2].id).toBe(character.id);
    });

    test ("Buscar un personaje por su dimension y ordenarlo por su inteligencia de forma descendente", () => {
      const result = multiverseManager.searchCharacters({originDimension: dimension}, "intelligence", "desc");
      expect(result.length).toBe(3);
      expect(result[0].id).toBe(character.id);
      expect(result[1].id).toBe(character3.id);
      expect(result[2].id).toBe(character2.id);
    });

    test ("Buscar un personaje por todos sus atributos y ordenarlo por su nombre de forma ascendente", () => {
      const result = multiverseManager.searchCharacters({name: "Rick Sanchez", specie: specie, originDimension: dimension, state: "alive"}, "name", "asc");
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(character.id);
    });

  });

  //pruebas para buscar inventos
  describe('Metodo searchInventions', () => {
    test('Buscar un invento por su nombre', () => {
      multiverseManager.addInvention(invention);
      multiverseManager.addInvention(invention2);
      multiverseManager.addInvention(invention3);
      const result = multiverseManager.searchInventions({name: "Portal Gun"});
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(invention.id);
    });

    test ('Buscar un invento por su inventor', () => {
      const result = multiverseManager.searchInventions({inventor: character});
      expect(result.length).toBe(3);
      expect(result[0].id).toBe(invention.id);
      expect(result[1].id).toBe(invention2.id);
      expect(result[2].id).toBe(invention3.id);
    });

    test("Buscar un invento por todos sus atributos", () => { 
      const result = multiverseManager.searchInventions({name: "Portal Gun", inventor: character, type: "Gadget", dangerLevel: 8});
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(invention.id);
    });

  });

  //pruebas de búsqueda de localizaciones
  describe('Metodo searchLocations', () => {
    test('Buscar una localización por su nombre', () => {
      multiverseManager.addLocation(location);
      multiverseManager.addLocation(location2);
      multiverseManager.addLocation(location3);
      const result = multiverseManager.searchLocations({name: "Citadel of Ricks"});
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(location.id);
    });
    
    test ('Buscar una localización por su dimension', () => {
      const result = multiverseManager.searchLocations({dimension: dimension});
      expect(result.length).toBe(3);
      expect(result[0].id).toBe(location.id);
      expect(result[1].id).toBe(location2.id);
      expect(result[2].id).toBe(location3.id);
    }); 

    test("Buscar una localización por todos sus atributos", () => {
      const result = multiverseManager.searchLocations({name: "Citadel of Ricks", dimension: dimension, type: "City"});
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(location.id);
    });
  });

  //pruebas de la búsqueda de localizaciones alternativas de un personaje
  describe('Metodo searchAlternativeLocationOfACharacter', () => {
    test('Buscar localizaciones alternativas de un personaje', () => {
      multiverseManager.addDimension(dimension2);
      multiverseManager.addCharacter(character_);
      const result = multiverseManager.searchAlternativeLocationOfACharacter(character.name);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe(dimension.id);
      expect(result[1].id).toBe(dimension2.id);
    });
  });
});