import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Invention } from "../../classes/Invention.js";

/**
 * Método para eliminar un invento del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la eliminación.
 */
export async function menuRemoveInvention(multiverseManager: MultiverseManager) {
    const inventionId = await prompts({
        type: "text",
        name: "id",
        message: "Introduce el ID del invento a eliminar:"
    });
    multiverseManager.removeInvention(inventionId.id);
    console.log(`El invento con id ${inventionId.id} se ha eliminado correctamente.`);
}