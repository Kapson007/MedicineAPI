import {Request} from "express";
import {ISupplements} from "./ISupplements";
import {ICures} from "./ICures";
import {IVaccines} from "./IVaccines";
export type Type = 'cures' | 'supplements' | 'vaccines';
export type Order = "asc" | "desc";
export type Unit = "mg" | "ug" | "g" | "ml";

export interface IMedicines {
    name: string;
    type: Type;
    manufactuer: string;
    activeSubstance: string;
    supplements?: ISupplements;
    cures?: ICures;
    vaccines?: IVaccines;
}

export interface IPatchRequest<T> extends Request {
    body: T;
}
