import { DimensionAttributes } from "../interfaces/IDimensionAttributes.js";
import { DimensionState } from "../types/DimensionState.js";

/**
 * Clase que representa una dimensión en el multiverso
 */
export class Dimension implements DimensionAttributes {
  /**
   * Inicializa una nueva dimensión.
   * @param id - Identificador único de la dimensión.
   * @param name - Nombre asignado a la dimensión.
   * @param state - Estado actual de la dimensión.
   * @param technologyLevel - Nivel de avance tecnológico (del 1 al 10).
   * @param description - Breve resumen o detalles de la dimensión.
   * @throws {Error} Si el `technologyLevel` no está en el rango permitido (1-10).
   */
  constructor(
    public id: string,
    public name: string,
    public state: DimensionState,
    public technologyLevel: number,
    public description: string
  ) {
    if (technologyLevel < 1 || technologyLevel > 10) {
      throw new Error('technologyLevel debe ser un valor entre 1 y 10');
    }
  }
}