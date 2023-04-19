import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    }catch (err){
        mongoose.connection.on('error', (err: Error) =>  console.log(err));
    }
}

