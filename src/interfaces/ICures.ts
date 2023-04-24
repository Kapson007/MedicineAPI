export type CureType = 'syrop' | 'tabletka' | 'maść' | 'krople' | 'czopek' | 'pigułka';
type Recommendation = "dzieci" | "dorośli" | "dzieci i dorośli";

export interface ICures {
    requiredPrescription: boolean;
    form: CureType;
    singleDose: number;
    ingredients: string;
    recommendation: Recommendation;
}