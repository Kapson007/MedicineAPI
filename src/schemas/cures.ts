import mongoose from 'mongoose';
import {ICures, CureType} from '../interfaces/ICures';

export const cureSchema = new mongoose.Schema(
    {
        requiredPrescription:{
            type: Boolean,
            required: true,
        },
        form: {
            type: String,
            enum: ['syrop', 'tabletka', 'maść', 'krople', 'czopek', 'pigułka'],
            required: true,
        },
        singleDose: {
            type: Number,
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
