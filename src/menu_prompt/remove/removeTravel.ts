import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Travel } from "../../classes/Travel.js";

/**
 * Método para eliminar un viaje del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la eliminación.
 */
export async function menuRemoveTravel(multiverseManager: MultiverseManager) {
    const travelId = await prompts({
        type: "text",
        name: "id",
        message: "Introduce el ID del viaje a eliminar:"
    });
    multiverseManager.removeTravel(travelId.id);
    console.log(`El viaje con id ${travelId.id} se ha eliminado correctamente.`);
}
