import { describe, test, expect } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Location } from '../../src/classes/Location.js';
import { Invention } from '../../src/classes/Invention.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';
import { db } from '../../src/database/database.js';

describe('Add Elements Tests:', () => {
  const dimension: Dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
  const dimension2: Dimension = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");
  const specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
  const multiverseManager = new MultiverseManager();
  const character: Character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
  const character_: Character = new Character("C-0012", "Rick Sanchez", specie, dimension2, "alive", "none", 10, "A genius scientist");
  const character2: Character = new Character("C-002", "Morty Smith", specie, dimension, "alive", "none", 5, "Rick's grandson");
  const character3: Character = new Character("C-003", "Summer Smith", specie, dimension, "alive", "none", 6, "Morty's older sister");
  const location: Location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
  const location2: Location = new Location("L-002", "Earth", dimension, "Planet", 7000000000, "The planet where most of the characters live.");
  const location3: Location = new Location("L-003", "Jerrybore", dimension, "Daycare center", 100, "A daycare center where Jerry works.");
  const invention: Invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions");
  const invention2: Invention = new Invention("I-002", "SpaceShip", character, "Vehicle", 9, "A spaceship that allows to travel through space");
  const invention3: Invention = new Invention("I-003", "Pickle Rick", character, "Transformation", 7, "A device that allows to transform into a pickle");

  // pruebas de creación de la clase gestora
  describe('Creacion de la clase',() => {
    test('La clase se creo correctamente.', ()=> {
      expect(multiverseManager).toBeDefined();
    })

    test('Se instancion un objeto de la clase correctamente.', ()=> {
      return expect(multiverseManager).toBeInstanceOf(MultiverseManager);
    })
  });

  // pruebas para añadir dimensiones a la base de datos
  describe('Metodo addDimension', () => {
    test('Añadir una dimension', () => {
      const size = db.data.dimensions.length;
      multiverseManager.addDimension(dimension);
      expect(db.data.dimensions.length).toBe(size + 1);
    });

    test ('Añadir una dimension que ya esta en la base de datos', () => {
      return expect(multiverseManager.addDimension(dimension)).rejects.toThrow(`Dimension with id ${dimension.id} already exists.`);
    });
  });

  // pruebas para añadir especies a la base de datos
  describe('Metodo addSpecie', () => {
    test('Añadir una especie', () => {
      const size = db.data.species.length;
      multiverseManager.addSpecie(specie);
      expect(db.data.species.length).toBe(size + 1);
    });

    test ('Añadir una especie que ya esta en la base de datos', () => {
      return expect(multiverseManager.addSpecie(specie)).rejects.toThrow(`Specie with id ${specie.id} already exists.`);
    });

    test ('Añadir una especie con una dimension que no esta en la base de datos', () => {
      const specie_ = new Species("S-002", "Alien", new Dimension("D-002", "Dimension-2", "active", 5, "Another dimension"), "Unknown", 100, "An alien specie");
      return expect(multiverseManager.addSpecie(specie_)).rejects.toThrow("The origin dimension of the specie doesn't exist.");
    });
  });

  //pruebas para añadir personajes a la base de datos
  describe('Metodo addCharacter', () => {
    test('Añadir un personaje', () => {
      const size = db.data.characters.length;
      multiverseManager.addCharacter(character);
      expect(db.data.characters.length).toBe(size + 1);
    });

    test ('Añadir un personaje que ya esta en la base de datos', () => {
     expect(multiverseManager.addCharacter(character)).rejects.toThrow(`Character with id ${character.id} already exists.`);
    });

    test ('Añadir un personaje con una dimension que no esta en la base de datos', () => {
      const character_ = new Character("C-004", "Rick Sanchez", specie, new Dimension("D-002", "Dimension-2", "active", 5, "Another dimension"), "alive", "none", 10, "A genius scientist");
      expect(multiverseManager.addCharacter(character_)).rejects.toThrow("The dimension of the location doesn't exist.");
    });
    
    test ('Añadir un personaje con una especie que no esta en la base de datos', () => {
      const character_ = new Character("C-004", "Rick Sanchez", new Species("S-002", "Alien", dimension, "Unknown", 100, "An alien specie"), dimension, "alive", "none", 10, "A genius scientist");
      expect(multiverseManager.addCharacter(character_)).rejects.toThrow("The specie of the character doesn't exist.");
    });

  });

  //pruebas para añadir inventos a la base de datos
  describe('Metodo addInvention', () => {
    test('Añadir un artefacto', () => {
      const size = db.data.inventions.length;
      multiverseManager.addInvention(invention);
      expect(db.data.inventions.length).toBe(size + 1);
    });

    test ('Añadir un artefacto que ya esta en la base de datos', () => {
      expect(multiverseManager.addInvention(invention)).rejects.toThrow(`Invention with id ${invention.id} already exists.`);
    });

    test ('Añadir un artefacto con un inventor que no esta en la base de datos', () => {
      const invention_ = new Invention("I-004", "Portal Gun", new Character("C-005", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist"), "Gadget", 8, "A device that allows to travel between dimensions");
      expect(multiverseManager.addInvention(invention_)).rejects.toThrow("The inventor of the invention doesn't exist.");
    });
  });

  //pruebas para añadir localizaciones a la base de datos
  describe('Metodo addLocation', () => {
    test('Añadir una localización', () => {
      const size = db.data.locations.length;
      multiverseManager.addLocation(location);
      expect(db.data.locations.length).toBe(size + 1);
    });

    test ('Añadir una localización que ya esta en la base de datos', () => {
      expect(multiverseManager.addLocation(location)).rejects.toThrow(`Location with id ${location.id} already exists.`);
    });

    test ('Añadir una localización con una dimension que no esta en la base de datos', () => {
      const location_ = new Location("L-004", "Citadel of Ricks", new Dimension("D-002", "Dimension-2", "active", 5, "Another dimension"), "City", 1000000, "A city where all the Ricks live together.");
      expect(multiverseManager.addLocation(location_)).rejects.toThrow("The dimension of the location doesn't exist.");
    });
  });
});