import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Experiment } from "../../classes/Experiment.js";

export async function menuRemoveExperiment(multiverseManager: MultiverseManager) {
    const experimentId = await prompts({
        type: "text",
        name: "id",
        message: "Introduce el ID del experimento a eliminar:"
    });
    multiverseManager.removeExperiment(experimentId.id);
    console.log(`Experimento con ID ${experimentId.id} destruida.`)
}