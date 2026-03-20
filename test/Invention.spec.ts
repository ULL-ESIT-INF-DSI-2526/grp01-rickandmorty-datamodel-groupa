import { describe, test, expect } from 'vitest';
import { Character } from '../src/classes/Character.js';
import { Dimension } from '../src/classes/Dimension.js';
import { Species } from '../src/classes/Species.js';
import { Invention } from '../src/classes/Invention.js';
import { Location } from '../src/classes/Location.js';

describe('Clase Invention', () => {
    let dimension: Dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension of Rick and Morty");
    const location = new Location('L-001', 'location-1', dimension, 'Planeta', 300000000,'Gran planeta verde');
    let specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common species in the multiverse");
    let character: Character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist with a reckless personality");
    let invention: Invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows the user to travel between dimensions", location);

     describe('Creación de la clase:', () => {
        test('Debería crear una instancia de Invention', () => {
            expect(invention).toBeInstanceOf(Invention);
        });

        test('El objeto esat definido', () => {
            expect(invention).toBeDefined();
        });
    });

    describe('Atributos de la clase:', () => {
        test('id', () => {
            expect(invention.id).toBe("I-001");
        });

        test('name', () => {
            expect(invention.name).toBe("Portal Gun");
        });

        test('inventor', () => {
            expect(invention.inventor).toBe(character);
        });

        test('type', () => {
            expect(invention.type).toBe("Gadget");
        });

        test('technologyLevel', () => {
            expect(invention.dangerLevel).toBe(8);
        });

        test('description', () => {
            expect(invention.description).toBe("A device that allows the user to travel between dimensions");
        });

        test('inventionLocation', () => {
            expect(invention.inventionLocation).toBe(location);
        });
    });

    describe('Error al introducir dangerLevel', () => {
        test('Debería lanzar un error si el nivel de peligro es menor a 1', () => {
            expect(() => new Invention("I-001", "Portal Gun", character, "Gadget", -4, "A device that allows the user to travel between dimensions", location)).toThrow("El nivel de peligro debe de estar en el rango [1-10]");
        });

        test('Debería lanzar un error si el nivel de peligro es mayor a 10', () => {
            expect(() => new Invention("I-001", "Portal Gun", character, "Gadget", 84, "A device that allows the user to travel between dimensions", location)).toThrow("El nivel de peligro debe de estar en el rango [1-10]");
        });
    });
});