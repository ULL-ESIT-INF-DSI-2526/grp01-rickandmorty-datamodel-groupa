import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Location } from "../../classes/Location.js";

/**
 * Método para agregar una nueva localización al multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la adición.
 */
export async function menuAddLocation(multiverseManager: MultiverseManager) {
  const data = await prompts([
    { type: 'text', name: 'id', message: 'ID de la localización:' },
    { type: 'text', name: 'name', message: 'Nombre de la localización:' },
    { type: 'select',
      name: 'dimension',
      message: 'Selecciona la dimensión:',
      choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
    },
    { type: 'text', name: 'type', message: 'Tipo:' },
    { type: 'number', name: 'population', message: 'Población aproximada:' },
    { type: 'text', name: 'desc', message: 'Descripción:' }
  ]);
  
  multiverseManager.addLocation(new Location(data.id, data.name, data.dimension, data.type, data.population, data.desc));
}