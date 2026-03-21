import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Character } from "../../classes/Character.js";

/**
 * Método para eliminar un personaje del multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la eliminación.
 */
export async function menuRemoveCharacter(multiverseManager: MultiverseManager) {
  const characterId = await prompts({
    type: "text",
    name: "id",
    message: "Introduce el ID del personaje a eliminar:"
  });
  multiverseManager.removeCharacter(characterId.id);
  
  console.log(`El personaje con id ${characterId.id} se ha eliminado correctamente.`);
}
