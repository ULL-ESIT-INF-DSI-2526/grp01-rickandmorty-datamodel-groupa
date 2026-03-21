/**
 * Interfaz para eliminar elementos del sistema
 */
export interface IRemove {
    /**
     * Elimina una dimensión del sistema.
     * @param id - ID de la dimensión a eliminar.
     */
    removeDimension(id: string): void;
    /**
     * Elimina una especie del sistema.
     * @param id - ID de la especie a eliminar.
     */
     removeSpecie(id: string): void;
    /**
     * Elimina una localización del sistema.
     * @param id - ID de la localización a eliminar.
     */
    removeLocation(id: string): void;
    /**
     * Elimina un personaje del sistema.
     * @param id - ID del personaje a eliminar.
     */
    removeCharacter(id: string): void;
    /**
     * Elimina una especie del sistema.
     * @param id - ID de la especie a eliminar.
     */
    removeSpecie(id: string): void;
    /**
     * Elimina un invento del sistema.
     * @param id - ID del invento a eliminar.
     */
    removeInvention(id: string): void;
    /**
     * Elimina un viaje del sistema.
     * @param id - ID del viaje a eliminar.
     */
    removeTravel(id: string): void;
    /**
     * Elimina un experimento del sistema.
     * @param id - ID del experimento a eliminar.
     */
    removeExperiment(id: string): void;
}