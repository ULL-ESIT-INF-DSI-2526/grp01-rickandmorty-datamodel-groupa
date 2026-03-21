import { describe, test, expect, beforeEach } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Location } from '../../src/classes/Location.js';
import { Invention } from '../../src/classes/Invention.js';
import { Travel } from '../../src/classes/Travel.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';
import { Experiment } from '../../src/classes/Experiment.js';

describe('Remove Elements Tests:', () => {
  let dimension: Dimension;
  let dimension2: Dimension;
  let specie: Species;
  let multiverseManager: MultiverseManager;
  let character: Character;
  let character2: Character;
  let location: Location;
  let invention: Invention;
  let travel: Travel;
  let experiment: Experiment;

  beforeEach(() => {
    MultiverseManager.resetInstance();
    multiverseManager = MultiverseManager.getInstance();
    dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
    dimension2 = new Dimension("C-138", "Earth", "active", 5, "A new dimension");
    specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
    character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
    character2 = new Character("C-002", "Morty Smith", specie, dimension, "alive", "none", 5, "Rick's grandson");
    location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
    invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions", location, "on");
    travel = new Travel("T-001", dimension, dimension, character, new Date(2026, 3, 3, 14, 34, 0), "ocio");
    experiment = new Experiment("E-001", "Test Experiment", "An experiment to test the MultiverseManager class", character, "failed" , dimension, "destroyDimension");
  });

  // pruebas de eliminar dimensiones de la base de datos
  describe('Metodo removeDimension', () => {
    test('Eliminar una dimension y las localizaciones que pertenecen a esa dimension', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addDimension(dimension2);
      multiverseManager.addLocation(location); 
      const size = multiverseManager.dimensions.length;
      multiverseManager.removeDimension(dimension.id);
      expect(multiverseManager.dimensions.length).toBe(size);
      expect(multiverseManager.dimensions[0].state).toEqual('destroyed');
      expect(multiverseManager.locations.length).toBe(0);
    });
  });

  // pruebas de eliminar especies de la base de datos
  describe('Metodo removeSpecie', () => {
    test('Eliminar una especie y todos los personajes que pertenezcan a esa especie', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      const size = multiverseManager.species.length;
      multiverseManager.removeSpecie(specie.id);
      expect(multiverseManager.species.length).toBe(size - 1);
      expect(multiverseManager.characters.length).toBe(0);
    });
  });
 
  // pruebas de eliminar personajes de la base de datos
  describe('Metodo removeCharacter', () => {
    test('Eliminar un personaje', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addCharacter(character2);
      const size = multiverseManager.characters.length;
      multiverseManager.removeCharacter(character.id);
      expect(multiverseManager.characters.length).toBe(size);
      expect(multiverseManager.characters[0].state).toEqual('dead');
    });
  });

  // pruebas de eliminar inventos de la base de datos
  describe('Metodo removeInvention', () => {
    test('Eliminar un artefacto', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addInvention(invention);
      const size = multiverseManager.inventions.length;
      multiverseManager.removeInvention(invention.id);
      expect(multiverseManager.inventions.length).toBe(size - 1);
    });

  });

  // pruebas de eliminar localizaciones de la base de datos
  describe('Metodo removeLocation', () => {
    test('Eliminar una localización', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addLocation(location);
      const size = multiverseManager.locations.length;
      multiverseManager.removeLocation(location.id);
      expect(multiverseManager.locations.length).toBe(size - 1);
    });
  });

  // eliminar un viaje
  describe('Metodo removeTravel', () => {
    test('Eliminar un viaje', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addTravel(travel);
      const size = multiverseManager.travels.length;
      multiverseManager.removeTravel(travel.id);
      expect(multiverseManager.travels.length).toBe(size - 1);
    });
  });

  // eliminar un experimento
  describe('Metodo removeExperiment', () => {
    test('Eliminar un experimento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addExperiment(experiment);
      const size = multiverseManager.experiments.length;
      multiverseManager.removeExperiment(experiment.id);
      expect(multiverseManager.experiments.length).toBe(size - 1);
    });
  });
});    