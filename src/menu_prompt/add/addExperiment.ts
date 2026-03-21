import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Experiment } from "../../classes/Experiment.js";

export async function menuAddExperiment(multiverseManager: MultiverseManager) {
  const data = await prompts([
     { type: 'text', name: 'id', message: 'ID del experimento:' },
     { type: 'text', name: 'name', message: 'Nombre del experimento:' },
     { type: 'text', name: 'description', message: 'Descripción del experimento:' },
     { type: 'select',
       name: 'creator',
       message: 'Selecciona el creador del experimento:',
       choices: multiverseManager.characters.map(c => ({ title: `${c.name} (${c.id})`, value: c }))
     },
     { 
       type: 'select',
       name: 'state',
       message: 'Estado:',
       choices: [
         { title: 'Activo', value: 'active' },
         { title: 'Finalizado', value: 'finished' },
         { title: 'Fallido', value: 'failed' }
       ]
     },
     { type: 'select',
       name: 'originDimension',
       message: 'Selecciona la dimensión de origen:',
       choices: multiverseManager.dimensions.map(d => ({ title: `${d.name} (${d.id})`, value: d }))
     },
     { type: 'text', name: 'type', message: 'Tipo del experimento:' }
  ]);

  multiverseManager.addExperiment(new Experiment(data.id, data.name, data.description, data.creator, data.state, data.originDimension, data.type));
          
}