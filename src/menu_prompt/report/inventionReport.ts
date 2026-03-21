import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";

export async function menuInventionReport (multiverseManager: MultiverseManager) {
    const data = await prompts({
        type: 'number',
        name: 'danger',
        message: 'Introduce el nivel de peligro para filtrar las invenciones:'
    });
    
    const report = multiverseManager.getInventionsReport(data.danger);
}