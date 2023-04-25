import {Request, Response} from 'express';
import {Medicines} from '../schemas/medicines';
import {handleError, errorMachine} from '../utils/errorHandlingUtils';
import {IFilter} from '../interfaces/medicineController';
import {Order} from '../interfaces/IMedicines';

export default {
    async findCure(req: Request, res: Response) {
        try{
            const cure = await Medicines.findById(req.params.id);
            handleError(cure, "Not Found");
            return res.status(200).json({data: cure, code: 200}).end();
        }catch(err){
            errorMachine(res, err);
        }
    },

    async findAllCures(req: IFilter, res: Response) {
        try{
            // filters
             const filters = req.filters ? req.filters : {type: 'cures'};

             // pagination
            const offset = parseInt(req.query.offset as string) || 0;
            const perPage = parseInt(req.query.per_page as string) || 10;

            // sorting
            const sort_by = req.query.sort_by as string || 'createdAt';
            const order_by = req.query.order_by as Order || 'desc';
            const sortFilter = {[sort_by]: order_by}

            const curesPromise =
                Medicines
                    .find(filters)
                    .skip(offset)
                    .limit(perPage)
                    .sort(sortFilter);

            const cureCountPromise = Medicines.count(filters);
            const [cures, cureCount] = await Promise.all([curesPromise, cureCountPromise]);

            handleError(cures, "Not Found");
            handleError(cureCount, "Not Found");
            return res.status(200).json({data: cures, count: cureCount, code: 200}).end();

        }catch(err){
            errorMachine(res, err);
        }
    },
}