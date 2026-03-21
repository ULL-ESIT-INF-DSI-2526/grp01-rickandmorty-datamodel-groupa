import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Location } from "../../classes/Location.js";

export async function menuSearchLocation(multiverseManager: MultiverseManager) {
  const criteria = await prompts([
    { type: 'text', name: 'name', message: 'Nombre de la localización:' },
    { type: 'text', name: 'type', message: 'Tipo de la localización:' },
    { type: 'select',
      name: 'dimension',
      message: 'Dimensión de la localización:',
      choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
    }
  ]);

  const result = multiverseManager.searchLocations(criteria);
  console.log("Resultados de la búsqueda:");
  result.forEach(l => {
    console.log(`- ${l.name} (ID: ${l.id})`);
  });
  console.log("\n");
}