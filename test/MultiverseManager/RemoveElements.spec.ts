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
  const specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
  const multiverseManager = new MultiverseManager();
  const character: Character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
  const location: Location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
  const invention: Invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions");

  // pruebas de eliminar dimensiones de la base de datos
  describe('Metodo removeDimension', () => {
    test('Eliminar una dimension', () => {
      multiverseManager.addDimension(dimension);
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

  // pruebas de eliminar especies de la base de datos
  describe('Metodo removeSpecie', () => {
    test('Eliminar una especie', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
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

  // pruebas de eliminar personajes de la base de datos
  describe('Metodo removeCharacter', () => {
    test('Eliminar un personaje', () => {
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
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

  // pruebas de eliminar inventos de la base de datos
  describe('Metodo removeInvention', () => {
    test('Eliminar un artefacto', () => {
      multiverseManager.addCharacter(character);
      multiverseManager.addInvention(invention);
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

  // pruebas de eliminar localizaciones de la base de datos
  describe('Metodo removeLocation', () => {
    test('Eliminar una localización', () => {
      multiverseManager.addLocation(location);
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