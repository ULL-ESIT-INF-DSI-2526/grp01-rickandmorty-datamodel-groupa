export interface IModify {
    //Falta añadir los datos que se van a modificar
    modifyDimension(id: string): void;
    //Lo mismo que en el modifyDimension
    modifyLocation(id: string): void;
    modifyCharacter(id:string): void;
    modifySpecie(id:string): void;
    modifyInvention(id: string): void;
}