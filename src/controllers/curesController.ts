import {Request, Response} from 'express';
import {Medicines} from '../schemas/medicines';
import {handleError, errorMachine} from '../utils/errorHandlingUtils';

export default {
    async findCure(req: Request, res: Response) {
        try{
            const cure = await Medicines.findById(req.params.id);
            handleError(cure, "Not Found");
            return res.status(200).json({data: cure, code: 200}).end();
        }catch(err){
            errorMachine(res, err);
        }
    }
}