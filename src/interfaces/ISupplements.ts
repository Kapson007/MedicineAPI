import {SingleDose} from './ICures';

type SupplementForm = "krople" | "pastylki rozpuszczalne" | "tabletka" | "napar" | "olej";
type SupplementAction = "uspokajający" | "wzmacniający odporność" | "budowa sylwetki" | "nasenny" | "prebiotyk" | "gastryczny"

export interface ISupplements {
    singleDose: SingleDose
    action: SupplementAction,
    ingredients: string;
    form: SupplementForm,
}