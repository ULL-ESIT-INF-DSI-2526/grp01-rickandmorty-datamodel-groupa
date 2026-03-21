import { MultiverseManager } from "../../classes/MultiverseManager.js";

/**
 * Método para generar un informe de dimensiones a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y generar el informe.
 */
export async function menuDimensionReport(multiverseManager: MultiverseManager) {
    const report = multiverseManager.getDimensionReport();
}