/**
 * Define los atributos base compartidos por todas las entidades del sistema.
 * Ideal para ser extendida por otras interfaces (ej. DimensionAttributes).
 */
export interface GeneralAttributes {
  /** Identificador único de la entidad.*/  
  id: string;

  /** * Nombre público y legible por humanos.
   * @example "Dimensión C-137"
   */
  name: string;
}