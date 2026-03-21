import  prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";

/**
 * Método para generar un informe del historial de viajes de un personaje a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y generar el informe.
 */
export async function menuTravelHistoryReport (multiverseManager: MultiverseManager) {
    const report = await prompts ([
        { type: 'select',
          name: 'character',
          message: 'Selecciona un personaje:',
          choices: multiverseManager.characters.map(c => ({ title: `${c.name} (${c.id})`, value: c }))
        }
    ]);
    const str = multiverseManager.getTravelHistoryReport(report.character);
}
