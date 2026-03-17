import { describe, test, expect } from 'vitest';
import { Character } from '../src/classes/Character.js';
import { Dimension } from '../src/classes/Dimension.js';
import { Species } from '../src/classes/Species.js';
import { Location } from '../src/classes/Location.js';
import { Invention } from '../src/classes/Invention.js';
import { MultiverseManager } from '../src/classes/MultiverseManager.js';
import { db } from '../src/database/database.js';

describe('MultiverseManager Tests:', () => {
  const dimension: Dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension of Rick and Morty");
  const specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common species in the multiverse");
  const multiverseManager = new MultiverseManager();
  const character: Character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist with a reckless personality");
  const location: Location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks from different dimensions live together.");
  const invention: Invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows the user to travel between dimensions");

  // pruebas de creación de la cñase gestora
  describe('Creacion de la clase',() => {
    test('La clase se creo correctamente.', ()=> {
      expect(multiverseManager).toBeDefined();
    })

    test('Se instancion un objeto de la clase correctamente.', ()=> {
      expect(multiverseManager).toBeInstanceOf(MultiverseManager);
    })
  });

  // prubeas para añadir elelmentos a la base de datos
  describe('Metodo addDimension', () => {
    test('Añadir una dimension', () => {
      const size = db.data.dimensions.length;
      multiverseManager.addDimension(dimension);
      expect(db.data.dimensions.length).toBe(size + 1);
    });
  });

  describe('Metodo addSpecie', () => {
    test('Añadir una especie', () => {
      const size = db.data.species.length;
      multiverseManager.addSpecie(specie);
      expect(db.data.species.length).toBe(size + 1);
    });
  });

  describe('Metodo addCharacter', () => {
    test('Añadir un personaje', () => {
      const size = db.data.characters.length;
      multiverseManager.addCharacter(character);
      expect(db.data.characters.length).toBe(size + 1);
    });
  });

  describe('Metodo addInvention', () => {
    test('Añadir un artefacto', () => {
      const size = db.data.inventions.length;
      multiverseManager.addInvention(invention);
      expect(db.data.inventions.length).toBe(size + 1);
    });
  });

  describe('Metodo addLocation', () => {
    test('Añadir una localización', () => {
      const size = db.data.locations.length;
      multiverseManager.addLocation(location);
      expect(db.data.locations.length).toBe(size + 1);
    });
  });

  // pruebas de consultas 
  describe('Metodo searchCharacters', () => {
    test('Buscar un personaje por su nombre', () => {
      const result = multiverseManager.searchCharacters({name: "Rick Sanchez"}, "name", "asc");
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(character.id);
    });
  });


  // pruebas de eliminar elementos de la base de datos
  describe('Metodo removeDimension', () => {
    test('Eliminar una dimension', () => {
      const size = db.data.dimensions.length;
      multiverseManager.removeDimension(dimension.id);
      expect(db.data.dimensions.length).toBe(size - 1);
    });

    test('Eliminar una dimension que no esta en la base de datos', () => {
      const size = db.data.dimensions.length;
      multiverseManager.removeDimension(dimension.id);
      expect(db.data.dimensions.length).toBe(size);
    });
  });

  describe('Metodo removeSpecie', () => {
    test('Eliminar una especie', () => {
      const size = db.data.species.length;
      multiverseManager.removeSpecie(specie.id);
      expect(db.data.species.length).toBe(size - 1);
    });

    test('Eliminar una especie que no esta en la base de datos', () => {
      const size = db.data.species.length;
      multiverseManager.removeSpecie(specie.id);
      expect(db.data.species.length).toBe(size);
    });
  });

  describe('Metodo removeCharacter', () => {
    test('Eliminar un personaje', () => {
      const size = db.data.characters.length;
      multiverseManager.removeCharacter(character.id);
      expect(db.data.characters.length).toBe(size - 1);
    });

    test('Eliminar un personaje que no esta en la base de datos', () => {
      const size = db.data.characters.length;
      multiverseManager.removeCharacter(character.id);
      expect(db.data.characters.length).toBe(size);
    });
  });

  describe('Metodo removeInvention', () => {
    test('Eliminar un artefacto', () => {
      const size = db.data.inventions.length;
      multiverseManager.removeInvention(invention.id);
      expect(db.data.inventions.length).toBe(size - 1);
    });

    test('Eliminar un artefacto que no esta en la base de datos', () => {
      const size = db.data.inventions.length;
      multiverseManager.removeInvention(invention.id);
      expect(db.data.inventions.length).toBe(size);
    });
  });

  describe('Metodo removeLocation', () => {
    test('Eliminar una localización', () => {
      const size = db.data.locations.length;
      multiverseManager.removeLocation(location.id);
      expect(db.data.locations.length).toBe(size - 1);
    });

    test('Eliminar una localización que no esta en la base de datos', () => {
      const size = db.data.locations.length;
      multiverseManager.removeLocation(location.id);
      expect(db.data.locations.length).toBe(size);
    });
  });
});