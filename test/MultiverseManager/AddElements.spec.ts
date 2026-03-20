import { describe, test, expect, beforeEach } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Location } from '../../src/classes/Location.js';
import { Invention } from '../../src/classes/Invention.js';
import { Travel } from '../../src/classes/Travel.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';

describe('Add Elements Tests:', () => {
  let multiverseManager: MultiverseManager;
  let dimension: Dimension;
  let dimension2: Dimension;
  let specie: Species;
  let character: Character;
  let character_: Character;
  let character2: Character;
  let character3: Character;
  let location: Location;
  let location2: Location;
  let location3: Location;
  let invention: Invention;
  let invention2: Invention;
  let invention3: Invention;
  let travel: Travel;

  beforeEach(() => {
    multiverseManager = new MultiverseManager();

    dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
    dimension2 = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");

    specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");

    character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
    character_ = new Character("C-0012", "Rick Sanchez", specie, dimension2, "alive", "none", 10, "A genius scientist");
    character2 = new Character("C-002", "Morty Smith", specie, dimension, "alive", "none", 5, "Rick's grandson");
    character3 = new Character("C-003", "Summer Smith", specie, dimension, "alive", "none", 6, "Morty's older sister");

    location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
    location2 = new Location("L-002", "Earth", dimension, "Planet", 7000000000, "The planet where most of the characters live.");
    location3 = new Location("L-003", "Jerrybore", dimension, "Daycare center", 100, "A daycare center where Jerry works.");

    invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions", location);
    invention2 = new Invention("I-002", "SpaceShip", character, "Vehicle", 9, "A spaceship that allows to travel through space", location);
    invention3 = new Invention("I-003", "Pickle Rick", character, "Transformation", 7, "A device that allows to transform into a pickle", location);
 
    travel = new Travel("T-001", dimension, dimension2, character2, new Date(2026, 3, 3, 14, 34, 0), "Searching Rick");
  });

  // Pruebas de creación de la clase gestora
  describe('Creacion de la clase', () => {
    test('La clase se creo correctamente.', () => {
      expect(multiverseManager).toBeDefined();
    });

    test('Se instancio un objeto de la clase correctamente.', () => {
      expect(multiverseManager).toBeInstanceOf(MultiverseManager);
    });
  });

  // Pruebas para añadir dimensiones a la colección
  describe('Metodo addDimension', () => {
    test('Añadir una dimension', () => {
      const size = multiverseManager.dimensions.length;
      multiverseManager.addDimension(dimension);
      expect(multiverseManager.dimensions.length).toBe(size + 1);
    });

    test('Añadir una dimension que ya esta añadida', () => {
      multiverseManager.addDimension(dimension);
      expect(() => multiverseManager.addDimension(dimension)).toThrow(`La dimensión con id ${dimension.id} ya existe.`);
    });
  });
 
  // Pruebas para añadir especies a la colección
  describe('Metodo addSpecie', () => {
    test('Añadir una especie', () => {
      multiverseManager.addDimension(dimension); // PRERREQUISITO: La dimensión debe existir primero
      const size = multiverseManager.species.length;
      multiverseManager.addSpecie(specie);
      expect(multiverseManager.species.length).toBe(size + 1);
    });

    test('Añadir una especie que ya esta añadida', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      expect(() => multiverseManager.addSpecie(specie)).toThrow(`La especie con id ${specie.id} ya existe.`);
    });

    test('Añadir una especie con una dimension que no esta en la colección', () => {
      const specie_ = new Species("S-002", "Alien", new Dimension("D-002", "Dimension-2", "active", 5, "Another dimension"), "Unknown", 100, "An alien specie");
      expect(() => multiverseManager.addSpecie(specie_)).toThrow("La dimensión de origen de la especie no existe.");
    });
  });

  // Pruebas para añadir personajes a la colección
  describe('Metodo addCharacter', () => {
    test('Añadir un personaje', () => {
      multiverseManager.addDimension(dimension); // PRERREQUISITO
      multiverseManager.addSpecie(specie);       // PRERREQUISITO
      const size = multiverseManager.characters.length;
      multiverseManager.addCharacter(character);
      expect(multiverseManager.characters.length).toBe(size + 1);
    });

    test('Añadir un personaje que ya esta en la colección', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      expect(() => multiverseManager.addCharacter(character)).toThrow(`El personaje con id ${character.id} ya existe.`);
    });

    test('Añadir un personaje con una dimension que no esta en la colección', () => {
      const character_ = new Character("C-004", "Rick Sanchez", specie, new Dimension("D-002", "Dimension-2", "active", 5, "Another dimension"), "alive", "none", 10, "A genius scientist");
      expect(() => multiverseManager.addCharacter(character_)).toThrow("La dimensión de origen del personaje no existe.");
    });
    
    test('Añadir un personaje con una especie que no esta en la colección', () => {
      multiverseManager.addDimension(dimension); // Necesitamos que pase el chequeo de dimensión para que falle por especie
      const character_ = new Character("C-004", "Rick Sanchez", new Species("S-002", "Alien", dimension, "Unknown", 100, "An alien specie"), dimension, "alive", "none", 10, "A genius scientist");
      expect(() => multiverseManager.addCharacter(character_)).toThrow("La especie del personaje no existe.");
    });
  });

  // Pruebas para añadir inventos a la colección
  describe('Metodo addInvention', () => {
    test('Añadir un artefacto', () => {
      multiverseManager.addDimension(dimension); // PRERREQUISITO
      multiverseManager.addSpecie(specie);       // PRERREQUISITO
      multiverseManager.addCharacter(character); // PRERREQUISITO (El inventor)
      
      const size = multiverseManager.inventions.length;
      multiverseManager.addInvention(invention);
      expect(multiverseManager.inventions.length).toBe(size + 1);
    });

    test('Añadir un artefacto que ya esta en la colección', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addInvention(invention);
      
      expect(() => multiverseManager.addInvention(invention)).toThrow(`El invento con id ${invention.id} ya existe.`);
    });

    test('Añadir un artefacto con un inventor que no esta en la colección', () => {
      const invention_ = new Invention("I-004", "Portal Gun", new Character("C-005", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist"), "Gadget", 8, "A device that allows to travel between dimensions", location);
      expect(() => multiverseManager.addInvention(invention_)).toThrow("El inventor del invento no existe.");
    });
  });

  // Pruebas para añadir localizaciones a la colección
  describe('Metodo addLocation', () => {
    test('Añadir una localización', () => {
      multiverseManager.addDimension(dimension); // PRERREQUISITO
      const size = multiverseManager.locations.length;
      multiverseManager.addLocation(location);
      expect(multiverseManager.locations.length).toBe(size + 1);
    });
  
    test('Añadir una localización que ya esta en la colección', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addLocation(location);
      expect(() => multiverseManager.addLocation(location)).toThrow(`La ubicación con id ${location.id} ya existe.`);
    });

    test('Añadir una localización con una dimension que no esta en la coleccion', () => {
      const location_ = new Location("L-004", "Citadel of Ricks", new Dimension("D-002", "Dimension-2", "active", 5, "Another dimension"), "City", 1000000, "A city where all the Ricks live together.");
      expect(() => multiverseManager.addLocation(location_)).toThrow("La dimensión de la ubicación no existe.");
    });
  });

  describe('Método addTravel', () => {
    test ('Añadir un nuevo viaje a la coleccion', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character2);
      multiverseManager.addTravel(travel);
      expect(multiverseManager.travels.length).toBe(1); 
    });
 
    test('Añadir un viaje con un personaje que no esta en la coleccion', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);

      expect(() => multiverseManager.addTravel(travel)).toThrow(`El personaje que realiza el viaje no existe`);
    });

    test('Añadir un viaje con una dimensión que no esta en la coleccion', () => {
      multiverseManager.addDimension(dimension)
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character2);
 
      expect(() => multiverseManager.addTravel(travel)).toThrow("La dimensión de destino del viaje no existe."); 
    });   
 
    test ('Añadir un viaje que ya esta en la colección', () => { 
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character2);
      multiverseManager.addTravel(travel);
      
      expect(() => multiverseManager.addTravel(travel)).toThrow(`El viaje con id ${travel.id} ya existe.`);
    });
  }); 
  
}); 