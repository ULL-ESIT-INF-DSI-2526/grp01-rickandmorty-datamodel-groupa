import { describe, test, expect, beforeEach } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Location } from '../../src/classes/Location.js';
import { Invention } from '../../src/classes/Invention.js';
import { Travel } from '../../src/classes/Travel.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';

describe('Modify Elements Tests:', () => {
  let dimension: Dimension;
  let dimension2: Dimension;
  let specie: Species;
  let specie2: Species;
  let multiverseManager: MultiverseManager;
  let character: Character;
  let character2: Character;
  let location: Location;
  let location2: Location;
  let invention: Invention;
  let travel: Travel;

  beforeEach(() => {
    MultiverseManager.resetInstance();
    multiverseManager = MultiverseManager.getInstance();
    dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
    dimension2 = new Dimension("C-138", "Earth", "active", 5, "A new dimension");
    specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
    specie2 = new Species("S-002", "Alien", dimension, "Mammal", 90, "A rare specie");
    character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
    character2 = new Character("C-002", "Morty Smith", specie, dimension, "alive", "none", 5, "Rick's grandson");
    location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
    location2 = new Location("L-002", "Earth C-138", dimension2, "Planet", 7000000000, "A new Earth");
    invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions", location, "on");
    travel = new Travel("T-001", dimension, dimension, character, new Date(2026, 3, 3, 14, 34, 0), "ocio");
  });

  //pruebas para modificar dimensiones
  describe('Metodo modifyDimension', () => {
    test ('Modificar todos los atributos de una dimension', () => { 
      multiverseManager.addDimension(dimension);
      const size = multiverseManager.dimensions.length;
      multiverseManager.modifyDimension(dimension.id, {state: 'destroyed', technologyLevel: 10, description: 'A new dimension' });
      expect(multiverseManager.dimensions.length).toBe(size);
      expect(multiverseManager.dimensions[0].technologyLevel).toEqual(10);
      expect(multiverseManager.dimensions[0].state).toEqual('destroyed');
      expect(multiverseManager.dimensions[0].description).toEqual('A new dimension');
    });

    test ('Lanza error porque no encuentra la dimension', () => {
      expect(() => multiverseManager.modifyDimension("C-999", { state: 'destroyed' })).toThrowError("La dimensión que desea cambiar no se encuentra en la colección");
    });

    test ('Modificar el estado de una dimension', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.modifyDimension(dimension.id, { state: 'destroyed' });
      expect(multiverseManager.dimensions[0].state).toEqual('destroyed');
    });

    test ('Modificar el nivel tecnológico de una dimension', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.modifyDimension(dimension.id, { technologyLevel: 10 });
      expect(multiverseManager.dimensions[0].technologyLevel).toEqual(10);
    });

    test ('Modificar la descripción de una dimension', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.modifyDimension(dimension.id, { description: 'A new dimension' });
      expect(multiverseManager.dimensions[0].description).toEqual('A new dimension');
    }); 
  });

  //pruebas para modificar personajes
  describe('Metodo modifyCharacter', () => {
    test ('Modificar todos los atributos de un personaje', () => { 
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addSpecie(specie2);
      multiverseManager.addDimension(dimension2);
        const size = multiverseManager.characters.length;
        multiverseManager.modifyCharacter(character.id, { species: specie2, originDimension: dimension2, state: 'dead', affiliation: 'Ricks', inteligenceLevel: 9, description: 'A new character' });
        expect(multiverseManager.characters.length).toBe(size);
      expect(multiverseManager.characters[0].state).toEqual('dead');
      expect(multiverseManager.characters[0].affiliation).toEqual('Ricks');
      expect(multiverseManager.characters[0].inteligenceLevel).toEqual(9);
      expect(multiverseManager.characters[0].description).toEqual('A new character');
    });

    test ('Lanza error porque no encuentra el personaje', () => {
      expect(() => multiverseManager.modifyCharacter("C-999", { state: 'dead' })).toThrowError("El personaje que desea cambiar no se encuentra en la colección");
    });

    test ('Modificar la especie de un personaje', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.modifyCharacter(character.id, { species: specie2 });
      expect(multiverseManager.characters[0].species).toEqual(specie2);
    });

    test ('Modificar la dimension de origen de un personaje', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.modifyCharacter(character.id, { originDimension: dimension2 });
      expect(multiverseManager.characters[0].originDimension).toEqual(dimension2);
    });

    test ('Modificar el estado de un personaje', () => {  
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.modifyCharacter(character.id, { state: 'dead' });
      expect(multiverseManager.characters[0].state).toEqual('dead');
    });

     test ('Modificar la afiliación de un personaje', () => {  
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.modifyCharacter(character.id, { affiliation: 'Ricks' });
      expect(multiverseManager.characters[0].affiliation).toEqual('Ricks');
    });

    test ('Modificar el nivel de inteligencia de un personaje', () => {  
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.modifyCharacter(character.id, { inteligenceLevel: 9 });
      expect(multiverseManager.characters[0].inteligenceLevel).toEqual(9);
    });

    test ('Modificar la descripción de un personaje', () => {  
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.modifyCharacter(character.id, { description: 'A new character' });
      expect(multiverseManager.characters[0].description).toEqual('A new character');
    });

    
  });

  describe ('Metodo modifyLocation', () => {
    test ('Modificar todos los atributos de una localizacion', () => { 
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addLocation(location);
      const size = multiverseManager.locations.length;
      multiverseManager.modifyLocation(location.id, { dimension: dimension2, type: 'Planet', aproxPopulation: 700, description: 'A new location'});
      expect(multiverseManager.locations.length).toBe(size);
      expect(multiverseManager.locations[0].type).toEqual('Planet');
      expect(multiverseManager.locations[0].dimension).toEqual(dimension2);
      expect(multiverseManager.locations[0].description).toEqual('A new location');
      expect(multiverseManager.locations[0].aproxPopulation).toEqual(700);
    });

    test ('Lanza error porque no encuentra la localizacion', () => {
      expect(() => multiverseManager.modifyLocation("L-999", { type: 'Planet' })).toThrowError("La localizacion que desea cambiar no se encuentra en la colección");
    });

    test ('Modificar la dimension de una localizacion', () => {
        multiverseManager.addDimension(dimension);
        multiverseManager.addDimension(dimension2);
        multiverseManager.addLocation(location);
        multiverseManager.modifyLocation(location.id, { dimension: dimension2 });
        expect(multiverseManager.locations[0].dimension).toEqual(dimension2);
    });

    test ('Modificar el tipo de una localizacion', () => {
        multiverseManager.addDimension(dimension);
        multiverseManager.addLocation(location);
        multiverseManager.modifyLocation(location.id, { type: 'Planet' });
        expect(multiverseManager.locations[0].type).toEqual('Planet');
    });

    test ('Modificar la población aproximada de una localizacion', () => {
        multiverseManager.addDimension(dimension);
        multiverseManager.addLocation(location);
        multiverseManager.modifyLocation(location.id, { aproxPopulation: 700 });
        expect(multiverseManager.locations[0].aproxPopulation).toEqual(700);
    });

    test ('Modificar la descripción de una localizacion', () => {
        multiverseManager.addDimension(dimension);
        multiverseManager.addLocation(location);
        multiverseManager.modifyLocation(location.id, { description: 'A new location' });
        expect(multiverseManager.locations[0].description).toEqual('A new location');
    });
  });

  describe ('Metodo modifyInvention', () => {
    test ('Modificar todos los atributos de un invento', () => { 
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addLocation(location2);
      multiverseManager.addCharacter(character2);
      const size = multiverseManager.inventions.length;
      multiverseManager.modifyInvention(invention.id, { inventor: character2 , type: 'Weapon', dangerLevel: 6, description: 'A new invention', inventionLocation: location2 });
      expect(multiverseManager.inventions.length).toBe(size);
      expect(multiverseManager.inventions[0].inventor).toEqual(character2);
      expect(multiverseManager.inventions[0].type).toEqual('Weapon');
      expect(multiverseManager.inventions[0].dangerLevel).toEqual(6);
      expect(multiverseManager.inventions[0].description).toEqual('A new invention');
      expect(multiverseManager.inventions[0].inventionLocation).toEqual(location2);
    });

    test ('Lanza error porque no encuentra el invento', () => {
      expect(() => multiverseManager.modifyInvention("I-999", { type: 'Weapon' })).toThrowError("El invento que desea cambiar no se encuentra en la colección");
    });

    test ('Modificar el inventor de un invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);
      multiverseManager.modifyInvention(invention.id, { inventor: character2 });
      expect(multiverseManager.inventions[0].inventor).toEqual(character2);
    });

    test ('Modificar el tipo de un invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);
      multiverseManager.modifyInvention(invention.id, { type: 'Weapon' });
      expect(multiverseManager.inventions[0].type).toEqual('Weapon');
    });

    test ('Modificar el nivel de peligro de un invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);
      multiverseManager.modifyInvention(invention.id, { dangerLevel: 6 });
      expect(multiverseManager.inventions[0].dangerLevel).toEqual(6);
    });

    test ('Modificar la descripción de un invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);
      multiverseManager.modifyInvention(invention.id, { description: 'A new invention' });
      expect(multiverseManager.inventions[0].description).toEqual('A new invention');
    });

    test ('Modificar la localización de un invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);
      multiverseManager.addLocation(location2);
      multiverseManager.modifyInvention(invention.id, { inventionLocation: location2 });
      expect(multiverseManager.inventions[0].inventionLocation).toEqual(location2);
    });
  });

  describe ('Metodo modifySpecie', () => {
    test ('Modificar todos los atributos de una especie', () => { 
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addSpecie(specie);
      const size = multiverseManager.species.length;
      multiverseManager.modifySpecie(specie.id, {origin: dimension2, type: 'Reptile', lifeExpectancy: 100, description: 'A new specie' });
      expect(multiverseManager.species.length).toBe(size);
      expect(multiverseManager.species[0].origin).toEqual(dimension2);
      expect(multiverseManager.species[0].type).toEqual('Reptile');
      expect(multiverseManager.species[0].lifeExpectancy).toEqual(100);
      expect(multiverseManager.species[0].description).toEqual('A new specie');
    });

    test('Lanza error porque no encuentra la especie', () => {
      expect(() => multiverseManager.modifySpecie("S-999", { type: 'Reptile' })).toThrowError("La especie que desea cambiar no se encuentra en la colección");
    });

    test('Modificar el origen de una especie', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addSpecie(specie);
      multiverseManager.modifySpecie(specie.id, { origin: dimension2 });
      expect(multiverseManager.species[0].origin).toEqual(dimension2);
    });

    test('Modificar el tipo de una especie', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.modifySpecie(specie.id, { type: 'Reptile' });
      expect(multiverseManager.species[0].type).toEqual('Reptile');
    });

    test('Modificar la esperanza de vida de una especie', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.modifySpecie(specie.id, { lifeExpectancy: 100 });
      expect(multiverseManager.species[0].lifeExpectancy).toEqual(100);
    });

    test('Modificar la descripción de una especie', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.modifySpecie(specie.id, { description: 'A new specie' });
      expect(multiverseManager.species[0].description).toEqual('A new specie');
    });
  });
});


