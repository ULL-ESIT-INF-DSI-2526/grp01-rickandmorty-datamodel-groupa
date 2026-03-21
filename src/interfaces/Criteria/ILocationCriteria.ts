import { Dimension } from "../../classes/Dimension.js";

/**
 * Criterios de búsqueda para ubicaciones.
 */
export interface ILocationCriteria {
    name?: string;
    type?: string;
    dimension?: Dimension;
}