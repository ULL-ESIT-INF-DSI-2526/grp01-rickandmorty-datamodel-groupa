import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Character } from "../../classes/Character.js";

/**
 * Método para buscar localizaciones alternativas de un personaje en el multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la búsqueda.
 */
export async function menuSearchAlternativeLocationOfACharacter(multiverseManager: MultiverseManager){
  const response = await prompts({ type: 'text', name: 'name', message: 'Nombre del personaje:' });
    const result = multiverseManager.searchAlternativeLocationOfACharacter(response.name);
    console.log("Dimensiones con localizaciones alternativas:");
    result.forEach(d => {
      console.log(`- ${d.name} (ID: ${d.id})`);
  });
  console.log("\n");
}