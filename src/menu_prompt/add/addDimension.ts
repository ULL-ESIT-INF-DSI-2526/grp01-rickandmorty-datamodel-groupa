import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Dimension } from "../../classes/Dimension.js";

/**
 * Método para agregar una nueva dimensión al multiverso a través del menú.
 * @param multiverseManager - Instancia del MultiverseManager para acceder a los datos y realizar la adición.
 */
export async function menuAddDimension(multiverseManager: MultiverseManager) {
  const data = await prompts([
    { type: 'text', name: 'id', message: 'ID de la dimensión (ej: C-137):' },
    { type: 'text', name: 'name', message: 'Nombre de la dimensión:' },
    { 
      type: 'select', 
      name: 'state', 
      message: 'Estado:',
      choices: [
        { title: 'Activa', value: 'active' },
        { title: 'Destruida', value: 'destroyed' },
        { title: 'En Cuarentena', value: 'quarantine' }
      ]
    },
    { type: 'number', name: 'tech', message: 'Nivel tecnológico (1-10):', min: 1, max: 10 },
    { type: 'text', name: 'desc', message: 'Descripción:' }
  ]);
  multiverseManager.addDimension(new Dimension(data.id, data.name, data.state, data.tech, data.desc));
}