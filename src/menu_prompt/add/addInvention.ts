import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Invention } from "../../classes/Invention.js";

/**
 * Método para agregar un nuevo invento al multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la adición.
 */
export async function menuAddInvention(multiverseManager: MultiverseManager) {
    const data = await prompts([
        { type: 'text', name: 'id', message: 'ID del invento:' },
        { type: 'text', name: 'name', message: 'Nombre del invento:' },
        { type: 'select',
          name: 'inventor',
          message: 'Selecciona el inventor:',
          choices: multiverseManager.characters.map(c => ({ title: `${c.name} (${c.id})`, value: c }))
        },
        { type: 'text', name: 'type', message: 'Tipo:' },
        { type: 'number', name: 'danger', message: 'Nivel de peligro (1-10):', min: 1, max: 10 },
        { type: 'text', name: 'desc', message: 'Descripción:' },
        { type: 'select',
          name: 'inventionLocation',
          message: 'Selecciona la ubicación del invento:',
          choices: multiverseManager.locations.map(l => ({ title: `${l.name} (${l.id})`, value: l }))
        },
        { 
          type: 'select',
          name: 'state',
          message: 'Estado:',
          choices: [
            { title: 'Activo', value: 'active' },
            { title: 'Neutralizado', value: 'neutralized' },
            { title: 'Desconocido', value: 'unknown' }
            ]
        }
    ]);

    multiverseManager.addInvention(new Invention(data.id, data.name, data.inventor, data.type, data.danger, data.desc, data.inventionLocation, data.state));
}