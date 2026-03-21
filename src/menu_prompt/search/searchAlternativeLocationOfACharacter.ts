import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Character } from "../../classes/Character.js";

export async function menuSearchAlternativeLocationOfACharacter(multiverseManager: MultiverseManager) {
  const response = await prompts({ type: 'text', name: 'name', message: 'Nombre del personaje:' });
    const result = multiverseManager.searchAlternativeLocationOfACharacter(response.name);
    console.log("Dimensiones con localizaciones alternativas:");
    result.forEach(d => {
      console.log(`- ${d.name} (ID: ${d.id})`);
  });
  console.log("\n");
}