import { describe, test, expect } from 'vitest';
import { Dimension } from '../src/classes/Dimension.js';
import { Species } from '../src/classes/Species.js';

describe('Clase Species', () => {
    let dimension: Dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension of Rick and Morty");
    let specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common species in the multiverse");

    describe('Creación de la clase:', () => {
        test('Debería crear una instancia de Species', () => {
            expect(specie).toBeInstanceOf(Species);
        });

        test('El objeto esat definido', () => {
            expect(specie).toBeDefined();
        });
    });

    describe('Atributos de la clase:', () => {
        test('id', () => {
            expect(specie.id).toBe("S-001");
        });

        test('name', () => {
            expect(specie.name).toBe("Human");
        });

        test('origin', () => {
            expect(specie.origin).toBe(dimension);
        });

        test('type', () => {
            expect(specie.type).toBe("Mammal");
        });

        test('lifeExpectancy', () => {
            expect(specie.lifeExpectancy).toBe(80);
        });

        test('description', () => {
            expect(specie.description).toBe("The most common species in the multiverse");
        });
    });
});