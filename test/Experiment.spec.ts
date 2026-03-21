import { describe, test, expect, beforeEach } from 'vitest'
import { Experiment } from "../src/classes/Experiment.js";
import { Character } from "../src/classes/Character.js";
import  { Dimension } from "../src/classes/Dimension.js";
import { Species } from "../src/classes/Species.js"


describe('Experiment Tests:', () => {
  let character: Character;
  let dimension: Dimension;
  let specie: Species;
  let experiment: Experiment;

  beforeEach(() => {
    dimension = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");
    specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
    character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
    experiment = new Experiment('E-001', "Experiment 1", "Testing the effects of a new invention", character, "failed", dimension, "createDimension");
  });

  describe('Creacion de la clase',() => {
    test('La clase se creo correctamente.', ()=> {
      expect(experiment).toBeDefined();
    })

    test('Se instancion un objeto de la clase correctamente.', ()=> {
      expect(experiment).toBeInstanceOf(Experiment);
    })
  });
  
  describe('Atributos de la clase:', () => {
    test('id', ()=> {
      expect(experiment.id).toBe('E-001');
    });  

    test('name', ()=> {
      expect(experiment.name).toBe('Experiment 1');
    });  

    test('description', ()=> {
      expect(experiment.description).toBe('Testing the effects of a new invention');
    });  

    test('originDimension', ()=> {
      expect(experiment.originDimension).toBe(dimension);
    });  

    test('creator', ()=> {
      expect(experiment.creator).toBe(character);
    }); 
    
    test('type', ()=> {
      expect(experiment.type).toBe("createDimension");
    }); 

    test('state', ()=> {
      expect(experiment.state).toBe("failed");
    }); 
  });
});