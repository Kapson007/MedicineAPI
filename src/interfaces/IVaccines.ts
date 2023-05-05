import {SingleDose} from './ICures';

type VaccineForm = "domięśniowa" | "doustna";
type VaccineCategory = "mRNA" | "żywe atenuowane" | "antygeny";


export interface IVaccine {
    singleDose: SingleDose,
    form: VaccineForm,
    isRequired: boolean,
    minAgeOfDose: number,
    ingredients: string,
}