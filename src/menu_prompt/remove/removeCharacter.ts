import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Character } from "../../classes/Character.js";

export async function menuRemoveCharacter(multiverseManager: MultiverseManager) {
  const characterId = await prompts({
    type: "text",
    name: "id",
    message: "Introduce el ID del personaje a eliminar:"
  });
  multiverseManager.removeCharacter(characterId.id);
  
  console.log(`El personaje con id ${characterId.id} se ha eliminado correctamente.`);
}
