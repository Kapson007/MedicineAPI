import {Request, Response} from 'express';
import {ISupplementController} from '../interfaces/ISupplementsController';
import {Medicines} from '../schemas/medicines';
import {handleError, errorMachine} from '../utils/errorHandlingUtils';
import {IFilter} from '../interfaces/IMedicineController';
import {IMedicines, Order} from '../interfaces/IMedicines'
import {isNotEmpty} from '../middlewares/filters';

export const supplementsController: ISupplementController = {
    async findSupplement(req: Request, res: Response) {
        try {
            const supplement = await Medicines.findById(req.params.id);
            handleError(supplement, "Not Found");
            return res.status(200).json({data: supplement, code: 200}).end()
        } catch (err) {
            handleError(res, err);
        }
    },
    async findAllSupplemments(req: IFilter, res: Response) {
        try {
            // filters
            const filters = isNotEmpty(req.filters) ? req.filters : {type: 'supplements'};

            //pagination
            const offset = parseInt(req.query.offset as string) || 0;
            const per_page = parseInt(req.query.per_page as string) || 10;

            // sorting
            const sort_by = req.query.sort_by as string || 'createdAt';
            const order_by = req.query.order_by as Order || 'desc';
            const sortFilter = {[sort_by]: order_by};

            const supplementsPromise =
                Medicines
                    .find(filters)
                    .skip(offset)
                    .limit(per_page)
                    .sort(sortFilter);

            const supplementsCountPromise = Medicines.count(filters);
            const [supplements, supplementsCount] = await Promise.all([supplementsPromise, supplementsCountPromise]);

            handleError(supplements, "Not Found");
            handleError(supplementsCount, "Not Found");
            return res.status(200).json({data: supplements, count: supplementsCount, code: 200}).end();
        } catch (err) {
            handleError(res, err);
        }
    },
    async createSupplement(req: Request, res: Response) {
        try {
            const supplementsData = req.body;
            const isExist = await Medicines.findOne({name: supplementsData.name}).exec();
            if(isExist) {
                throw new Error("Conflict");
            }
            const supplement = await new Medicines(supplementsData).save();
            return res.status(201).json({
                data: supplementsData,
                message: "Supplement has been created",
                code: 201
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },
    async updateSupplement(req: Request, res: Response) {
        try {
            const supplementData: IMedicines = req.body;
            const supplementToUpdate = await Medicines.findByIdAndUpdate({_id: req.params.id}, supplementData, {new: true});
            handleError(supplementToUpdate, "Not Found");
            return res.status(200).json({
                data: supplementToUpdate,
                message: `Supplement with id:${req.params.id} has been updated`,
                code: 200
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },
    async updateSupplementPartially(req: Request, res: Response){
        //    add modyfing partially
    },
    async deleteSupplement(req: Request, res: Response) {
        try {
            const supplementToDelete = await Medicines.findByIdAndDelete(req.params.id);
            handleError(supplementToDelete, "Not Found");
            return res.status(204)
                .json({message: `Supplement with id:${req.params.id} has been deleted`, code: 204})
                .end();

        } catch (err) {
            errorMachine(res, err);
        }
    }
}