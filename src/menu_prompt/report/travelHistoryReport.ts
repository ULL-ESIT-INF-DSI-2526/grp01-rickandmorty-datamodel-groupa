import  prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";

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
