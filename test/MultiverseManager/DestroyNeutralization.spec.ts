import { describe, test, expect, beforeEach } from 'vitest';
import { Invention } from "../../src/classes/Invention";
import { Character } from "../../src/classes/Character";
import { Dimension } from "../../src/classes/Dimension";
import { Species } from "../../src/classes/Species";
import { Location } from "../../src/classes/Location";
import { MultiverseManager } from "../../src/classes/MultiverseManager";

describe ('MultiverseManager - Deployment - Neutralization Tests:', () => {
  let character: Character;
  let dimension: Dimension;
  let specie: Species;
  let location: Location;
  let invention: Invention;
  let multiverseManager: MultiverseManager;

  beforeEach(() => {
    MultiverseManager.resetInstance();
    multiverseManager = MultiverseManager.getInstance();

    dimension = new Dimension("C-137", "Earth", "active", 5, "The original dimension");
    specie = new Species("S-001", "Human", dimension, "Mammal", 80, "The most common specie");
    character = new Character("C-001", "Rick Sanchez", specie, dimension, "alive", "none", 10, "A genius scientist");
    location = new Location("L-001", "Citadel of Ricks", dimension, "City", 1000000, "A city where all the Ricks live together.");
    invention = new Invention("I-001", "Portal Gun", character, "Gadget", 8, "A device that allows to travel between dimensions", location, "on");
  });

  describe('Neutralization:', () => {
    test ('Neutralizar el invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);

      multiverseManager.InventionNeutralization(invention);
      expect(invention.state).toBe("off");
      expect(invention.dangerLevel).toBe(0);
    });
  });

  describe('Deployment:', () => {
    test ('Desplegar el invento', () => {
      multiverseManager.addDimension(dimension);
      multiverseManager.addSpecie(specie);
      multiverseManager.addCharacter(character);
      multiverseManager.addLocation(location);
      multiverseManager.addInvention(invention);

      multiverseManager.InventionDeployment(invention);
      expect(invention.state).toBe("on");
    });
  });

});
