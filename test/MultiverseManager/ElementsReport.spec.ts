import { describe, test, expect, beforeEach } from 'vitest';
import { Character } from '../../src/classes/Character.js';
import { Dimension } from '../../src/classes/Dimension.js';
import { Species } from '../../src/classes/Species.js';
import { Invention } from '.'
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
    let character2: Character;
    let character3: Character;
    let location: Location;
    let location2: Location;
    let location3: Location;
    let invention: Invention;
    let invention2: Invention;
    let invention3: Invention;
    let travel: Travel;

    beforeEach(() => {
        multiverseManager = new MultiverseManager();

        dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
        dimension2 = new Dimension("D-001", "Dimension-1", "active", 7, "Dimension con 1990 planetas");

        specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");

        character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
        character_ = new Character("C-0012", "Rick Sanchez", specie, dimension2, "alive", "none", 10, "A genius scientist");
        character2 = new Character("C-002", "Morty Smith", specie, dimension, "alive", "none", 5, "Rick's grandson");
        character3 = new Character("C-003", "Summer Smith", specie, dimension, "alive", "none", 6, "Morty's older sister");

        location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
        location2 = new Location("L-002", "Earth", dimension, "Planet", 7000000000, "The planet where most of the characters live.");
        location3 = new Location("L-003", "Jerrybore", dimension, "Daycare center", 100, "A daycare center where Jerry works.");

        invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions", location);
        invention2 = new Invention("I-002", "SpaceShip", character, "Vehicle", 9, "A spaceship that allows to travel through space", location);
        invention3 = new Invention("I-003", "Pickle Rick", character, "Transformation", 7, "A device that allows to transform into a pickle", location);
        
        travel = new Travel("T-001", dimension, dimension2, character2, new Date(2026, 3, 3, 14, 34, 0), "Searching Rick");
  
    });

    describe('Active Dimension Report', () => {
        test('Mostrar id y technology level de las dimensiones activas', () => {
            expect(multiverseManager.getDimensionReport()).toContain("Id: C-137, Tecnology Level: 5");
        });
    });

    describe('Most Dangerous Inventions Report', () => {
        test('Mas peligrosos que 5', () => {
            // expect(multiverseManager.getInventionsReport(5)).toContain("Id: D-001, Tecnology Level: 7");
        });
        test('Mas peligrosos que 7', () => {
            // expect(multiverseManager.getInventionsReport(5)).toContain("Id: D-001, Tecnology Level: 7");
        });
    });
});