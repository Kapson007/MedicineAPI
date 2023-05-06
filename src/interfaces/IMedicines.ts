import {ISupplements} from "./ISupplements";
export type Type = 'cures' | 'supplements' | 'vaccines';
export type Order = "asc" | "desc";
export type Unit = "mg" | "ug" | "g" | "ml";

export interface IMedicines {
    name: string;
    type: Type;
    manufactuer: string;
    activeSubstance: string;
    supplements?: ISupplements;
}