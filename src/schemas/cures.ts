import mongoose from 'mongoose';
import {ICures, CureType} from '../interfaces/ICures';

export const cureSchema = new mongoose.Schema(
    {
        requiredPrescription: {
            type: Boolean,
            required: true,
        },
        form: {
            type: String,
            enum: ['syrop', 'tabletka', 'maść', 'krople', 'czopek', 'pigułka'],
            required: true,
        },
        category: {
            type: String,
            enum: ["przeciwbólowe", "psychiatryczne", "steroidowe", "antybiotyki", "antydepresyjne", "antyhistaminowe", "hormonalne", "przeciwpasożytnicze", "antykolagulanty", "immunosupresyjne", "dermatologiczne", "przeciwgorączkowe", "otorynalaryngologiczne", "chemioterapia", "diabetyczne", "przeciwwirusowe", "przeciwgrzybicze"],
            required: true,
        },
        singleDose: {
            type: {
                value: Number,
                unit: String,
            },
            required: true,
        },
        ingredients: {
            type: String,
        },
        recommendation: {
            type: String,
            enum: ['dzieci', 'dorośli', 'dzieci i dorośli'],
        }
    },
    {
        _id: false,
        autoindex: false
    });

export const Cures = mongoose.model<ICures>('Cures', cureSchema);