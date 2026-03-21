import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";

/**
 * Método para generar un informe de inventos a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y generar el informe.
 */
export async function menuInventionReport (multiverseManager: MultiverseManager) {
    const data = await prompts({
        type: 'number',
        name: 'danger',
        message: 'Introduce el nivel de peligro para filtrar las invenciones:'
    });
    
    const report = multiverseManager.getInventionsReport(data.danger);
}