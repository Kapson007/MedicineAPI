import mongoose from 'mongoose';
import {IMedicines } from '../interfaces/IMedicines';
import {ICures} from '../interfaces/ICures';
import {cureSchema} from './cures';

const medicinesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['cures', 'supplements', 'vaccines'],
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    activeSubsrtance: {
        type: String,
        required: true,
    },
    cures: cureSchema,
    },
    {
        timestamps: true,
    }

);

export const Medicines = mongoose.model<IMedicines>('Medicines', medicinesSchema);