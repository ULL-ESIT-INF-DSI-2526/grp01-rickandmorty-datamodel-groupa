/** Representa los estados en los que puede encontrar una experimento. */
export type ExperimentState = "failed" | "success" | "running";
export type ExperimentType = "destroyDimension" | "createDimension"