import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Dimension } from "../../classes/Dimension.js";

/**
 * Método para eliminar una dimensión del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la eliminación.
 */
export async function menuRemoveDimension(multiverseManager: MultiverseManager) {
    const dimensionId = await prompts({
        type: "text",
        name: "id",
        message: "Introduce el ID de la dimensión a eliminar:"
    });
    multiverseManager.removeDimension(dimensionId.id);
    console.log(`Dimensión con ID ${dimensionId.id} se ha destruido.`);
}