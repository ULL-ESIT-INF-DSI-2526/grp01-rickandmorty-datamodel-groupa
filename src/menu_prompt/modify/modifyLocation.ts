import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Location } from "../../classes/Location.js";
import { LocationAttributes } from "../../interfaces/Attributes/ILocationAttributes.js";

export async function menuModifyLocation(multiverseManager: MultiverseManager) {
    const data = await prompts([
        { type: 'text', name: 'id', message: 'ID de la localización a modificar:' },
        { type: 'select',
          name: 'dimension',
          message: 'Selecciona la nueva dimensión:',
          choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
        },
        { type: 'text', name: 'type', message: 'Nuevo tipo:' },
        { type: 'number', name: 'aproxPopulation', message: 'Nueva población aproximada:' },
        { type: 'text', name: 'description', message: 'Nueva descripción:' }
    ]);

    const modifyAttributes: Partial<LocationAttributes> = {};

    if (data.dimension) modifyAttributes.dimension = data.dimension;
    if (data.type) modifyAttributes.type = data.type;
    if (data.aproxPopulation) modifyAttributes.aproxPopulation = data.aproxPopulation;
    if (data.description) modifyAttributes.description = data.description;

    const location = multiverseManager.locations.find(l => l.id == data.id);

    multiverseManager.modifyLocation(data.id, modifyAttributes);
    console.log(`Localización con ID ${data.id} se ha modificado.`);  
    console.log(`Localización modificada: id ${location?.id}, dimensión ${location?.dimension.name}, tipo ${location?.type}, población aproximada ${location?.aproxPopulation}, descripción ${location?.description}`);
}
