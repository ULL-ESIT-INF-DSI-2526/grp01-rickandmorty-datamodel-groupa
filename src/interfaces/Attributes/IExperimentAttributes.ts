import { Character } from "../../classes/Character.js"
import { Dimension } from "../../classes/Dimension.js";
import { ExperimentState, ExperimentType} from "../../types/ExperimentState.js";

export interface ExperimentAttributes {
    id: string;
    name: string;
    description: string;
    creator: Character;
    state: ExperimentState;
    originDimension: Dimension;
    type: ExperimentType;
}
