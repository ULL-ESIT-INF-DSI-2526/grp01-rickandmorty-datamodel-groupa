import { Dimension } from "./Dimension.js";
import { Character } from "./Character.js";
import { ExperimentAttributes } from "../interfaces/Attributes/IExperimentAttributes.js";
import { ExperimentState, ExperimentType } from "../types/ExperimentState.js";

/**
 * Clase para experimentos que tiene unos personajes involucrados, una descripción, un estado y una dimensión de origen.
 */
export class Experiment implements ExperimentAttributes {
  /**
   * Constructor de la clase Experiment.
   * @param id - Identificador único del experimento.
   * @param name - Nombre del experimento.
   * @param description - Descripción detallada del experimento.
   * @param creator - Personaje que creó el experimento.
   * @param state - Estado actual del experimento (Ejemplo: En progreso, Completado, Fallido).
   * @param originDimension - Dimensión de origen del experimento.
   * @throws {Error} Si el estado del experimento no es válido (no es "En progreso", "Completado" o "Fallido").
   * 
   */
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public creator: Character,
    public state: ExperimentState,
    public originDimension: Dimension,
    public type: ExperimentType,
  ) {}
}