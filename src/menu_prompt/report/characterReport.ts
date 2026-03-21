import { MultiverseManager } from "../../classes/MultiverseManager.js";

/**
 * Método para generar un informe de personajes a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y generar el informe.
 */
export async function menuCharacterReport(multiverseManager: MultiverseManager) {
    const report = multiverseManager.getCharacterReport();
}