import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { InventionAttributes } from "../../interfaces/Attributes/IInventionAttributes.js";
import { Location } from "../../classes/Location.js";
import { Invention } from "../../classes/Invention.js";

export async function menuModifyInvention(multiverseManager: MultiverseManager) {
    const data = await prompts([
        { type: 'text', name: 'id', message: 'ID de la dimensión a modificar:' },
        { type: 'text', name: 'inventor', message: 'Nuevo inventor del artefacto:' },
        { type: 'text', name: 'type', message: 'Nuevo tipo del artefacto:' },
        { type: 'text', name: 'dangerLevel', message: 'Nuevo nivel de peligro del artefacto:' },
        { type: 'text', name: 'descr', message: 'Nueva descripción del artefacto:' },
        { type: 'select', 
            name: 'location',
            message: 'Nueva localización del invento:',
            choices: multiverseManager.locations.map(l => ({ title: `${l.name} (${l.id})`, value: l }))
        }
    ]);

    const modifyAttributes: Partial<InventionAttributes> = {};

    if (data.type) modifyAttributes.type = data.type;
    if (data.inventor) modifyAttributes.inventor = data.inventor;
    if (data.dangerLevel) modifyAttributes.dangerLevel = parseInt(data.dangerLevel);
    if (data.descr) modifyAttributes.description = data.descr;
    if (data.location) modifyAttributes.inventionLocation = data.location;

    const invention = multiverseManager.inventions.find(i => i.id == data.id);

    multiverseManager.modifyInvention(data.id, modifyAttributes);
    console.log(`Invento con ID ${data.id} se ha modificado.`);   
    console.log(`Invento modificado: id ${invention?.id}, inventor ${invention?.inventor.id}, tipo ${invention?.type}, nivel de peligrosidad ${invention?.dangerLevel}, descripción ${invention?.description}, localización ${invention?.inventionLocation.name}`); 
}