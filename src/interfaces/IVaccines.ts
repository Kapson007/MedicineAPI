import {SingleDose} from './ICures';

type VaccineForm = "domięśniowa" | "doustna";
type VaccineCategory = "mRNA" | "żywe atenuowane" | "antygeny";


export interface IVaccines {
    singleDose: SingleDose,
    form: VaccineForm,
    category: VaccineCategory,
    isObligatory: boolean,
    minAgeOfDose: number,
    ingredients: string,
}