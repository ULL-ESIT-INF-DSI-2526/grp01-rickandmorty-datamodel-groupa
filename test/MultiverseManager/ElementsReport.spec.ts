import { describe, test, expect, beforeEach } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Invention } from '../../src/classes/Invention.js';
import { Location } from '../../src/classes/Location.js';
import { Travel } from '../../src/classes/Travel.js';
import { MultiverseManager } from '../../src/classes/MultiverseManager.js';

describe('Elements Report Tests: ', () => {
    let multiverseManager: MultiverseManager;
    let dimension: Dimension;
    let dimension2: Dimension;
    let specie: Species;
    let character: Character;
    let character_: Character;
    let location: Location;
    let location2: Location;
    let location3: Location;
    let invention: Invention;
    let invention2: Invention;
    let invention3: Invention;
    let travel: Travel;

    beforeEach(() => {
        MultiverseManager.resetInstance();
        multiverseManager = MultiverseManager.getInstance();

        dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
        dimension2 = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");

        specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");

        character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
        character_ = new Character("C-0012", "Rick Sanchez", specie, dimension2, "alive", "none", 10, "A genius scientist");

        location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");

        invention = new Invention("I-001", "Portal Gun", character, "Gadget", 6, "A device that allows to travel between dimensions", location, "on");
        invention2 = new Invention("I-002", "SpaceShip", character, "Vehicle", 9, "A spaceship that allows to travel through space", location, "on");
        invention3 = new Invention("I-003", "Pickle Rick", character, "Transformation", 7, "A device that allows to transform into a pickle", location, "on");

        travel = new Travel("T-001", dimension, dimension2, character, new Date(2026, 3, 3, 14, 34, 0), "Searching Rick");
        
        multiverseManager.addDimension(dimension);
        multiverseManager.addDimension(dimension2);
        multiverseManager.addSpecie(specie);
        multiverseManager.addLocation(location);
        multiverseManager.addCharacter(character);
        multiverseManager.addCharacter(character_);
        multiverseManager.addInvention(invention);
        multiverseManager.addInvention(invention2);
        multiverseManager.addTravel(travel);
    });

    describe('Active Dimension Report', () => {
        test('Dimensiones Activas', () => {
            expect(multiverseManager.getDimensionReport()).toContain("Id: C-137, Tecnology Level: 5");
        });
    });

    describe('Most Dangerous Inventions Report', () => {
        test('Mas peligrosos que 5', () => {
            expect(multiverseManager.getInventionsReport(5)).toContain("Id: I-001, DangerousLevel: 6");
        });
        test('Mas peligrosos que 7', () => {
            expect(multiverseManager.getInventionsReport(7)).toContain("Id: I-002, DangerousLevel: 9");
        });
    });

    describe('Alternative Dimension Character Report', () => {
        test('Varias dimensiones', () => {
            expect(multiverseManager.getCharacterReport()).toContain("Character: Rick Sanchez,  Number of versions: 2");
        });
    });

    describe('Travel History report', () => {
        test('Viajes', () => {
            expect(multiverseManager.getTravelHistoryReport(character)).toContain(`Travel: T-001, Character: ${character}`);
        });
    });
});