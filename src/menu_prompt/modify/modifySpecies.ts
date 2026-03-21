import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Species } from "../../classes/Species.js";
import { SpeciesAttributes } from "../../interfaces/Attributes/ISpeciesAttributes.js";

/**
 * Método para modificar una especie del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la modificación.
 */
export async function menuModifySpecies(multiverseManager: MultiverseManager) {
    const data = await prompts([
        { type: 'text', name: 'id', message: 'ID de la especie a modificar:' },
        { type: 'select',
            name: 'dimension',
            message: 'Selecciona la nueva dimensión de origen:',
            choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
        },
        { type: 'text', name: 'type', message: 'Nuevo tipo:' },
        { type: 'number', name: 'life', message: 'Nueva esperanza de vida:' },
        { type: 'text', name: 'desc', message: 'Nueva descripción de la specie:' }
    ]);

    const modifyAttributes: Partial<SpeciesAttributes> = {};

    if (data.dimension) modifyAttributes.origin = data.dimension;
    if (data.life) modifyAttributes.lifeExpectancy = parseInt(data.life);
    if (data.type) modifyAttributes.type = data.type;
    if (data.desc) modifyAttributes.description = data.desc;

    const species = multiverseManager.species.find(s => s.id == data.id);

    multiverseManager.modifySpecie(data.id, modifyAttributes);
    console.log(`Especie con ID ${data.id} se ha modificado.`);
    console.log(`Especie modificada: id ${species?.id}, dimensión de origen ${species?.origin.name}, tipo ${species?.type}, esperanza de vida ${species?.lifeExpectancy}, descripción ${species?.description}`);
}