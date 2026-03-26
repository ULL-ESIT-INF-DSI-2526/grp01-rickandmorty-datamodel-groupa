import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { IDataBase } from "./db.js";

/**
 * Módulo que gestiona la base de datos del multiverso de Rick and Morty utilizando lowdb.
 */
const adapter = new JSONFile<IDataBase>("src/database/db.json");

/** Instancia de la base de datos. */
export const db = new Low<IDataBase>(adapter, {
    dimensions: [],
    species: [],
    characters: [],
    locations: [],
    inventions: [],
    experiments: [],
    travels: []
});

/**
 * Función para inicializar la base de datos. Lee los datos del archivo JSON y asegura que la estructura de la base de datos esté definida.
 */
export async function initializeDB() {
    await db.read();
    if (!db.data) db.data = { dimensions: [], species: [], characters: [], locations: [],  inventions: [],  experiments: [], travels: [] };
    await db.write();
}