import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Character } from "../../classes/Character.js";
import { CharacterAttributes } from "../../interfaces/Attributes/ICharacterAttributes.js";

/**
 * Método para modificar un personaje del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la modificación.
 */
export async function menuModifyCharacter(multiverseManager: MultiverseManager) {
    const data = await prompts([
        { type: 'text', name: 'id', message: 'ID del personaje a modificar:' },
        { type: 'select',
            name: 'species',
            message: 'Selecciona la nueva especie del personaje:',
            choices: multiverseManager.species.map(s => ({ title: `${s.name} (${s.id})`, value: s }))
        },
        { type: 'select',
            name: 'originDimension',
            message: 'Selecciona la nueva dimensión de origen del personaje:',
            choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
        },

        { type: 'select',
            name: 'state',
            message: 'Selecciona el nuevo estado del personaje:',
            choices: [
                { title: 'Vivo', value: 'alive' },
                { title: 'Muerto', value: 'dead' },
                { title: 'Desconocido', value: 'unknown' }
            ]
        },
        { type: 'text', name: 'affiliation', message: 'Nueva afiliación del personaje:' },
        { type: 'number', name: 'intelligenceLevel', message: 'Nuevo nivel de inteligencia del personaje:' },
        { type: 'text', name: 'desc', message: 'Nueva descripción del personaje:' }
    ]);

    const modifyAttributes: Partial<CharacterAttributes> = {};

    if (data.species) modifyAttributes.species = data.species;
    if (data.originDimension) modifyAttributes.originDimension = data.originDimension;
    if (data.state) modifyAttributes.state = data.state;
    if (data.affiliation) modifyAttributes.affiliation = data.affiliation;
    if (data.intelligenceLevel) modifyAttributes.inteligenceLevel = data.intelligenceLevel;
    if (data.desc) modifyAttributes.description = data.desc;

    const character = multiverseManager.characters.find(c => c.id == data.id);

    multiverseManager.modifyCharacter(data.id, modifyAttributes);
    console.log(`Personaje con ID ${data.id} se ha modificado.`);
    console.log(`Personaje modificado: id ${character?.id}, especie ${character?.species.name}, dimensión de origen ${character?.originDimension.name}, estado ${character?.state}, afiliación ${character?.affiliation}, nivel de inteligencia ${character?.inteligenceLevel}, descripción ${character?.description}`);
}