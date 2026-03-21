import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Species } from "../../classes/Species.js";

export async function menuRemoveSpecies(multiverseManager: MultiverseManager) {
  const speciesId = await prompts({
    type: "text",
    name: "id",
    message: "Introduce el ID de la especie a eliminar:"
  });
  multiverseManager.removeSpecie(speciesId.id);
  console.log(`La especie con id ${speciesId.id} se ha eliminado correctamente.`);
}