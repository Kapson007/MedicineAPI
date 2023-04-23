import {Router, Response, Request, NextFunction} from 'express';
import {Medicines} from '../schemas/Medicines';

export default {
    async findAll(req: Request, res: Response, next: NextFunction){
        try{
            console.log("find all medicines");
            const medicines = await Medicines.find().sort({createdAt: "desc"});
            return res.status(200).json({data: medicines}).end();

        }catch (err){
            res.status(404).json({error: "not found"}).end();
        }
    }

}