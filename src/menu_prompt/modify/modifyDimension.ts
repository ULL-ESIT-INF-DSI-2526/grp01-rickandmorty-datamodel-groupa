import prompts from "prompts";
import { MultiverseManager } from "../../classes/MultiverseManager.js";
import { Dimension } from "../../classes/Dimension.js";
import { DimensionAttributes } from "../../interfaces/Attributes/IDimensionAttributes.js";

export async function menuModifyDimension(multiverseManager: MultiverseManager) {
    const data = await prompts([
        { type: 'text', name: 'id', message: 'ID de la dimensión a modificar:' },
        { type: 'select', 
            name: 'state', 
            message: 'Nuevo estado de la dimensión:' },
        { type: 'text', name: 'tech', message: 'Nuevo nivel de tecnología de la dimensión:' },
        { type: 'text', name: 'desc', message: 'Nueva descripción de la dimensión:' }
    ]);

    const modifyAttributes: Partial<DimensionAttributes> = {};

    if (data.state) modifyAttributes.state = data.state;
    if (data.tech) modifyAttributes.technologyLevel = parseInt(data.tech);
    if (data.desc) modifyAttributes.description = data.desc;

    const dimension = multiverseManager.dimensions.find(d => d.id === data.id);

    multiverseManager.modifyDimension(data.id, modifyAttributes);
    console.log(`Dimensión con ID ${dimension?.id} se ha modificado.`);    
    console.log(`Dimensión modificada: id ${dimension?.id}, estado ${dimension?.state}, nivel de tecnología ${dimension?.technologyLevel}, descripción ${dimension?.description}`);    
}
