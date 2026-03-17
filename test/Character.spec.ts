import { describe, test, expect } from 'vitest';
import { Character } from '../src/classes/Character.js';
import { Dimension } from '../src/classes/Dimension.js';
import { Species } from '../src/classes/Species.js';

describe('Clase Character', () => {
    let dimension: Dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension of Rick and Morty");
    let specie: Species = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common species in the multiverse");
    let character: Character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist with a reckless personality");

    describe('Creación de la clase:', () => {
        test('Debería crear una instancia de Character', () => {
            expect(character).toBeInstanceOf(Character);
        });

        test('El objeto esat definido', () => {
            expect(character).toBeDefined();
        });
    });

    describe('Atributos de la clase:', () => {
        test('id', () => {
            expect(character.id).toBe("C-001");
        });

        test('name', () => {
            expect(character.name).toBe("Rick Sanchez");
        });

        test('species', () => {
            expect(character.species).toBe(specie);
        });

        test('originDimension', () => {
            expect(character.originDimension).toBe(dimension);
        });

        test('state', () => {
            expect(character.state).toBe("alive");
        });

        test('affiliation', () => {
            expect(character.affiliation).toBe("none");
        });

        test('inteligenceLevel', () => {
            expect(character.inteligenceLevel).toBe(10);
        });

        test('description', () => {
            expect(character.description).toBe("A genius scientist with a reckless personality");
        });
    });

    describe('Error al introducir inteligenceLevel', () => {
        test('Debería lanzar un error si el nivel de inteligencia es menor a 1', () => {
            expect(() => new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", -2, "A genius scientist with a reckless personality")).toThrow("El nivel de inteligencia debe de estar en el rango [1-10]");
        });

        test('Debería lanzar un error si el nivel de inteligencia es mayor a 10', () => {
            expect(() => new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 15, "A genius scientist with a reckless personality")).toThrow("El nivel de inteligencia debe de estar en el rango [1-10]");
        });
    });
});;
