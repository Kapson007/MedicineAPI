import {IMedicines, Unit} from './IMedicines';

export type CureType = 'syrop' | 'tabletka' | 'maść' | 'krople' | 'czopek' | 'pigułka';

type Recommendation = "dzieci" | "dorośli" | "dzieci i dorośli";

export type SingleDose = {
    value: number;
    unit: Unit;
}

type CureCategory = "przeciwbólowe" | "psychiatryczne" | "steroidowe" | "antybiotyki" | "antydepresyjne" | "antyhistaminowe" | "hormonalne" | "przeciwpasożytnicze" | "antykolagulanty"
    | "immunosupresyjne" | "dermatologiczne" | "przeciwgorączkowe" | "otorynalaryngologiczne" | "chemioterapia" | "diabetyczne" | "przeciwwirusowe" | "przeciwgrzybicze";

export interface ICures{
    requiredPrescription: boolean;
    form: CureType;
    category: CureCategory;
    singleDose: SingleDose;
    ingredients: string;
    recommendation: Recommendation;
}