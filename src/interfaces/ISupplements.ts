import {SingleDose} from './ICures';

type SupplementForm = "krople" | "pastylka rozpuszczalna" | "tabletka" | "napar" | "olej" | "proszek";
type SupplementAction = "uspokajający" | "wzmacniający odporność" | "budowa sylwetki" | "nasenny" | "prebiotyk" | "gastryczny"

export interface ISupplements {
    singleDose: SingleDose
    action: SupplementAction,
    ingredients: string;
    form: SupplementForm,
}