import { Character } from "../../classes/Character.js"
import { Dimension } from "../../classes/Dimension.js";
import { ExperimentState, ExperimentType} from "../../types/ExperimentState.js";
import { GeneralAttributes } from "./IGeneralAttributes.js";

/**
 * Representa los atributos que definen un Experimento.
 * 
 * Esta interfaz describe la estructura de los datos necesarios
 * para crear o representar un experimento del multiverso.
 */
export interface ExperimentAttributes extends GeneralAttributes {
    /** Descripción detallada del experimento */
    description: string;
    /** Personaje que creó el experimento */
    creator: Character;
    /** Estado actual del experimento */
    state: ExperimentState;
    /** Dimensión en la que se llevó a cabo el experimento. */
    originDimension: Dimension;
    /** Tipo de experimento si crea una dimensión o si la destruye */
    type: ExperimentType;
}
