import mongoose from 'mongoose';
import {IMedicines } from '../interfaces/IMedicines';
import {ICures} from '../interfaces/ICures';
import {cureSchema} from './cures';
import {supplementsSchema} from './supplements';

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
    manufactuer: {
        type: String,
        required: true,
    },
    activeSubstance: {
        type: String,
        required: true,
    },
    cures: cureSchema,
    supplements: supplementsSchema,
    },
    {
        timestamps: true,
    }

);

export const Medicines = mongoose.model<IMedicines>('Medicines', medicinesSchema);