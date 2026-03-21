import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Character } from "../../classes/Character.js";

/**
 * Método para agregar un nuevo personaje al multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la adición.
 */
export async function menuAddCharacter(multiverseManager: MultiverseManager) {
  const data = await prompts([
    { type: 'text', name: 'id', message: 'ID del personaje:' },
    { type: 'text', name: 'name', message: 'Nombre del personaje:' },
    { type: 'select',
    name: 'species',
    message: 'Selecciona la especie:',
    choices: multiverseManager.species.map(s => ({ title: `${s.name} (${s.id})`, value: s }))
    },
    { type: 'select',
    name: 'originDimension',
    message: 'Selecciona la dimensión de origen:',
    choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
    },
    { 
    type: 'select',
    name: 'state',
    message: 'Estado:',
    choices: [
        { title: 'Vivo', value: 'alive' },
        { title: 'Muerto', value: 'dead' },
        { title: 'Desconocido', value: 'unknown' }
    ]
    },
    { type: 'text', name: 'affiliation', message: 'Afiliación:' },
    { type: 'number', name: 'intelligence', message: 'Nivel de inteligencia (1-10):', min: 1, max: 10 },
    { type: 'text', name: 'desc', message: 'Descripción:' }
  ]);  
  multiverseManager.addCharacter(new Character(data.id, data.name, data.species, data.originDimension, data.state, data.affiliation, data.intelligence, data.desc));
}