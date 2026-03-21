import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Location } from "../../classes/Location.js";

/**
 * Método para eliminar una localización del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la eliminación.
 */
export async function menuRemoveLocation(multiverseManager: MultiverseManager) {
    const locationId = await prompts({
        type: "text",
        name: "id",
        message: "Introduce el ID de la localización a eliminar:"
    });
    multiverseManager.removeLocation(locationId.id);
    console.log(`La localización con id ${locationId.id} se ha eliminado correctamente.`);
}