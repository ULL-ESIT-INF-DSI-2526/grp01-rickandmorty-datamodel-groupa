import { describe, test, expect, beforeAll, beforeEach } from 'vitest'
import { Travel } from "../src/classes/Travel.js";
import { Dimension } from "../src/classes/Dimension.js";
import { Character } from '../src/classes/Character.js';
import { Species } from '../src/classes/Species.js';


describe('Travel Tests:', () => {
  let dimensionO: Dimension;
  let dimensionD: Dimension;
  let species: Species;
  let Rick: Character;
  let travel: Travel;

  beforeEach(() => {
    dimensionD = new Dimension('D-001', 'Dimension-1', 'active', 7, 'Dimension con 1990 planetas');
    dimensionO = new Dimension('C-137', 'Andromeda', 'active', 7, 'Dimensión de origen de Rick Sánchez');
    species= new Species("S-001", "Humano", dimensionO, "Mammal", 80, "La especie más común en el universo");
    Rick = new Character("C-001", "Rick Sanchez", species, dimensionO, "alive", "none", 10, "A genius scientist with a reckless personality");
    travel = new Travel('T-001', dimensionO, dimensionD, Rick, new Date('2026-03-20T15:30:00'), 'ocio');
  });

  describe('Creacion de la clase',() => {
    test('La clase se creo correctamente.', ()=> {
      expect(travel).toBeDefined();
    })

    test('Se instancion un objeto de la clase correctamente.', ()=> {
      expect(travel).toBeInstanceOf(Travel);
    })
  });
  
  describe('Atributos de la clase:', () => {
    test('id', ()=> {
      expect(travel.id).toBe('T-001');
    });

    test('originDimension', ()=> {
      expect(travel.originDimension.id).toBe('C-137');
    });  

    test('destinyDimension', ()=> {
      expect(travel.destinyDimension.id).toBe('D-001');
    });  

    test('character', ()=> {
      expect(travel.character).toBe(Rick);
    });  

    test('date', ()=> {
      expect(travel.date.getFullYear()).toBe(2026);
    });  

    test('motive', ()=> {
      expect(travel.motive).toBe('ocio');;
    });  
  });
});