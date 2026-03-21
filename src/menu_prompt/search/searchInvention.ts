import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Invention } from "../../classes/Invention.js";

/**
 * Método para buscar inventos en el multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la búsqueda.
 */
export async function menuSearchInvention(multiverseManager: MultiverseManager) {
    const criteria = await prompts([
        { type: 'text', name: 'name', message: 'Nombre del invento:' },
        { type: 'text', name: 'type', message: 'Tipo del invento:' },
        { type: 'text', name: 'inventor', message: 'Inventor del invento:' },
        { type: 'number', name: 'dangerLevel', message: 'Nivel de peligro del invento:' }
    ]);

    const result = multiverseManager.searchInventions(criteria);
    console.log("Resultados de la búsqueda:");
    result.forEach(i => {
        console.log(`- ${i.name} (ID: ${i.id})`);
    });
    console.log("\n");
}