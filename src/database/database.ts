import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { IDataBase } from "./db.js";

const adapter = new JSONFile<IDataBase>("src/database/db.json");

export const db = new Low<IDataBase>(adapter, {
    characters: [],
    dimensions: [],
    inventions: [],
    locations: [],
    species: []
});

export async function initializeDB() {
    await db.read();
    db.data ||= { characters: [], dimensions: [], inventions: [], locations: [], species: [] };
    await db.write();
}