import { describe, test, expect } from 'vitest'
import { Dimension } from "../src/classes/Dimension.js";


describe('Dimension Tests:', () => {
  const dimension = new Dimension('D-001', 'Dimension-1', 'active', 7, 'Dimension con 1990 planetas');
  describe('Creacion de la clase',() => {
    test('La clase se creo correctamente.', ()=> {
      expect(dimension).toBeDefined();
    })

    test('Se instancion un objeto de la clase correctamente.', ()=> {
      expect(dimension).toBeInstanceOf(Dimension);
    })
  });
  
  describe('Atributos de la clase:', () => {
    test('id', ()=> {
      expect(dimension.id).toBe('D-001');
    });  

    test('name', ()=> {
      expect(dimension.name).toBe('Dimension-1');
    });  

    test('state', ()=> {
      expect(dimension.state).toBe('active');
    });  

    test('technologyLevel', ()=> {
      expect(dimension.technologyLevel).toBe(7);
    });  

    test('description', ()=> {
      expect(dimension.description).toBe('Dimension con 1990 planetas');;
    });  
  });

  describe('Error al introducir technologyLevel', ()=> {
    test('Error. TechnologyLevel negativo', () => {
      expect(() => new Dimension('D-001', 'Dimension-1', 'active', -7, 'Dimension con 1990 planetas')).toThrow('technologyLevel debe ser un valor entre 1 y 10');
    })
  });
});