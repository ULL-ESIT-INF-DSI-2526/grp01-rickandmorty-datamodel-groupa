import prompts from "prompts";
import {Character} from '../../classes/Character.js';
import {MultiverseManager} from '../../classes/MultiverseManager.js';

/**
 * Método para buscar personajes en el multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la búsqueda.
 */
export async function menuSearchCharacter(multiverseManager: MultiverseManager) {
    const criteria = await prompts([
        { type: 'text', name: 'name', message: 'Nombre del personaje:' },
        { type: 'text', name: 'specie', message: 'Especie del personaje:' },
        { type: 'text', name: 'affiliation', message: 'Afiliación del personaje:' },
        { type: 'text', name: 'state', message: 'Estado del personaje:' },
        { type: 'text', name: 'originDimension', message: 'Dimensión de origen del personaje:' },
        { type: 'select',
        name: 'mode',
        message: 'Modo de ordenación:',
        choices: [
            { title: 'Ordenar por nombre', value: 'name' },
            { title: 'Ordenar por inteligencia', value: 'intelligence' },
        ]
        },
        {
        type: 'select',
        name: 'order',
        message: 'Orden:',
        choices: [
            { title: 'Ascendente', value: 'asc' },
            { title: 'Descendente', value: 'desc' },
        ]
        }
    ]);

    const result = multiverseManager.searchCharacters(criteria, criteria.mode, criteria.order);
    console.log("Resultados de la búsqueda:");
    result.forEach(c => {
        console.log(`- ${c.name} (ID: ${c.id})`);
    });
    console.log("\n");
}