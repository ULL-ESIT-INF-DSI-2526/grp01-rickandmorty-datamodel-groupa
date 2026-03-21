import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Species } from "../../classes/Species.js";

export async function menuAddSpecies(multiverseManager: MultiverseManager) {
  const data = await prompts([
    { type: 'text', name: 'id', message: 'ID de la especie:' },
    { type: 'text', name: 'name', message: 'Nombre de la especie:' },
    { type: 'select',
      name: 'originDimension',
      message: 'Selecciona la dimensión de origen:',
      choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
    },
    { type: 'text', name: 'type', message: 'Tipo:' },
    { type: 'number', name: 'life', message: 'Esperanza de vida:' },
    { type: 'text', name: 'desc', message: 'Descripción:' }
  ]);
  multiverseManager.addSpecie(new Species(data.id, data.name, data.originDimension, data.type, data.life, data.desc));
}