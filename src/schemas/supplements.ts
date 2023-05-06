import mongoose from 'mongoose';
import {ISupplements} from '../interfaces/ISupplements';

export const supplementsSchema = new mongoose.Schema({
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
        action: {
            type: String,
            enum: ['uspokajający', 'wzmacniający odporność', 'budowa sylwetki', 'nasenny', 'prebiotyk', 'gastryczny'],
            required: true,
        },
        form: {
            type: String,
            enum: ['krople', 'pastylki rozpuszczalne', 'tabletka', 'napar', 'olej', 'proszek'],
            required: true,
        }
    },
    {
        _id: false,
        autoIndex: false
    });

export const Supplements = mongoose.model<ISupplements>('Supplements', supplementsSchema);