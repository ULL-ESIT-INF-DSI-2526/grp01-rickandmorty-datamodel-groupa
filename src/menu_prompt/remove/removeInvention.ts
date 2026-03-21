import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Invention } from "../../classes/Invention.js";

export async function menuRemoveInvention(multiverseManager: MultiverseManager) {
    const inventionId = await prompts({
        type: "text",
        name: "id",
        message: "Introduce el ID del invento a eliminar:"
    });
    multiverseManager.removeInvention(inventionId.id);
    console.log(`El invento con id ${inventionId.id} se ha eliminado correctamente.`);
}