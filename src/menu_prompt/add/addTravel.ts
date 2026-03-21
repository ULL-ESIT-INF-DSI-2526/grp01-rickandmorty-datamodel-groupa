import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Travel } from "../../classes/Travel.js";

export async function menuAddTravel(multiverseManager: MultiverseManager) {
  const data = await prompts([
    { type: 'text', name: 'id', message: 'ID del viaje:' },
    { type: 'select',
      name: 'originDimension',
      message: 'Selecciona la dimensión de origen:',
      choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
    },
    { type: 'select',
      name: 'destinyDimension',
      message: 'Selecciona la dimensión de destino:',
      choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
    },
    { type: 'select',
      name: 'character',
      message: 'Selecciona el personaje que viaja:',
      choices: multiverseManager.characters.map(c => ({ title: `${c.name} (${c.id})`, value: c }))
    },
    { type: 'date', name: 'date', message: 'Fecha del viaje:' },
    { type: 'text', name: 'motive', message: 'Motivo del viaje:' }
  ]);

  multiverseManager.addTravel(new Travel(data.id, data.originDimension, data.destinyDimension, data.character, data.date, data.motive));
}