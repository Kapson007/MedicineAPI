import {Request, Response} from 'express';
import {Medicines} from '../schemas/medicines';
import {handleError, errorMachine} from '../utils/errorHandlingUtils';
import {IFilter} from '../interfaces/IMedicineController';
import {IMedicines, Order} from '../interfaces/IMedicines';
import {ICureController} from '../interfaces/ICureController';
import { ICures } from 'interfaces/ICures';
import {isNotEmpty} from '../middlewares/filters';

export const curesController: ICureController  =  {
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
             const filters =  isNotEmpty(req.filters) ? req.filters : {type: 'cures'};
             console.log(filters);
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

    async createCure(req: Request, res: Response) {
        try{
            const cureData: IMedicines = req.body;
            const cureToAdd = await new Medicines(cureData).save();
            handleError(cureToAdd, "Bad Request");
            return res.status(201).json({data: cureData,message: "Cure has been created" ,code: 201}).end();
        }catch (err){
            errorMachine(res, err);
        }
    },

    async updateCure(req: Request, res: Response) {
        try{
            const cureData: IMedicines = req.body;
            const cure = await Medicines.findByIdAndUpdate({_id: req.params.id}, cureData, {new: true});
            handleError(cure, "Not Found");
            return res.status(200).json({data: cure, message: `Cure with id:${req.params.id} has been updated`,code: 200}).end();
        }catch(err){
            errorMachine(res, err);
        }
    },

    async updateCurePartially(req: Request, res: Response) {
        try{
            const {...rest} = req.body;
            const cureToUpdate = await Medicines.findByIdAndUpdate({_id: req.params.id}, {...rest}, {new: true});
            handleError(cureToUpdate, "Not Found");
            res.status(204).json({message: `Cure with id:${req.params.id} has been updated partially`, code: 204}).end();
        }catch(err){
            errorMachine(res, err);
        }
    },

    async deleteCure(req: Request, res: Response) {
        try{
            const cureToDelete = await Medicines.findByIdAndRemove({_id: req.params.id});
            handleError(cureToDelete, "Not Found");
            return res.status(204).json({message: `No content. Cure with id:${req.params.id} has been deleted`, code: 204}).end();
        }catch(err){
            errorMachine(res, err);
        }
    }

}