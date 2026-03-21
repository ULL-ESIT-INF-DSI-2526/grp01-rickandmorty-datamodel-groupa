import { describe, test, expect, beforeEach } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Invention } from '../../src/classes/Invention.js';
import { Experiment } from '../../src/classes/Experiment.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';


describe('Experiment Tests:', () => {
  let character: Character;
  let dimension: Dimension;
  let specie: Species;
  let experimentDestroy: Experiment;
  let experimentCreate: Experiment;
  let multiverseManager: MultiverseManager;

  beforeEach(() => {
    MultiverseManager.resetInstance();
    multiverseManager = MultiverseManager.getInstance();

    dimension = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");
    specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
    character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
    experimentDestroy = new Experiment('E-001', "Experiment 1", "Destroy Dimension", character, "failed", dimension, "destroyDimension");
    experimentCreate = new Experiment('E-002', "Experiment 2", "Create Dimension", character, "failed", dimension, "createDimension");
    multiverseManager.addDimension(dimension);
    multiverseManager.addSpecie(specie);
    multiverseManager.addCharacter(character);
    multiverseManager.addExperiment(experimentDestroy);
    multiverseManager.addExperiment(experimentCreate);
});

  describe ("ExecuteExperiment en el caso de crear una dimension", () => {
    test('El experimento crea una dimensión correctamente', () => {
      multiverseManager.executeExperiment(experimentCreate, "DE-001");
      expect(multiverseManager.dimensions.length).toBe(2);
      expect(multiverseManager.dimensions[1].id).toBe("DE-001");
    });

    test('El experimento lanza un error si no se proporciona un id para la nueva dimensión', () => {
      expect(() => multiverseManager.executeExperiment(experimentCreate)).toThrow("Se requiere un id para crear una nueva dimensión.");
    });
  });

  describe("ExecuteExperiment en el caso de destruir una dimension", () => {
    test("El experimento destruye una dimensión correctamente", () => {
      expect(multiverseManager.dimensions.length).toBe(1);
      multiverseManager.executeExperiment(experimentDestroy);
      expect(multiverseManager.dimensions.length).toBe(1);
      expect(experimentDestroy.originDimension.state).toBe("destroyed");
    });
  });

  
});