import mongoose from 'mongoose';
import {IVaccine} from '../interfaces/IVaccines';

export const vaccineSchema = new mongoose.Schema({
    singleDose: {
        type: {
            value: Number,
            unit: {
                type: String,
                enum: ["mg", "ug", "g", "ml"]
            },
        },
        required: true
    },
    form: {
        type: String,
        enum: ['domięśniowa', 'doustna'],
        required: true,
    },
    category: {
        type: String,
        enum: ['mRNA', 'żywe atenuowane', 'inaktywowana'],
    },
    isObligatory: {
        type: Boolean,
        required: true,
    },
    minAgeOfDose: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    }
});

export const Vaccines = mongoose.model<IVaccine>('Vaccine', vaccineSchema);