import { describe, test, expect } from 'vitest'
import { Location } from "../src/classes/Location.js";
import { Dimension } from "../src/classes/Dimension.js";


describe('Location Tests:', () => {
  const dimension = new Dimension('D-001', 'Dimension-1', 'active', 7, 'Dimension con 1990 planetas');
  const location = new Location('L-001', 'location-1', dimension, 'Planeta', 300000000,'Gran planeta verde');
 
  describe('Creacion de la clase',() => {
    test('La clase se creo correctamente.', ()=> {
      expect(location).toBeDefined();
    })

    test('Se instancion un objeto de la clase correctamente.', ()=> {
      expect(location).toBeInstanceOf(Location);
    })
  });
  
  describe('Atributos de la clase:', () => {
    test('id', ()=> {
      expect(location.id).toBe('L-001');
    });  

    test('name', ()=> {
      expect(location.name).toBe('location-1');
    });  

    test('dimension', ()=> {
      expect(location.dimension).toBe(dimension);
    });  

    test('type', ()=> {
      expect(location.type).toBe('Planeta');
    });  

    test('aproxPopulation', ()=> {
      expect(location.aproxPopulation).toBe(300000000);
    });  

    test('description', ()=> {
      expect(location.description).toBe('Gran planeta verde');;
    });  
  });
});