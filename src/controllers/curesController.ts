import {Request, Response} from 'express';
import {Medicines} from '../schemas/medicines';
import {handleError, errorMachine} from '../utils/errorHandlingUtils';
import {IFilter} from '../interfaces/IMedicineController';
import {IMedicines, Order, IPatchRequest} from '../interfaces/IMedicines';
import {ICureController} from '../interfaces/ICureController';
import {ICures} from 'interfaces/ICures';
import {isNotEmpty} from '../middlewares/filters';

export const curesController: ICureController = {
    async findCure(req: Request, res: Response) {
        try {
            const cure = await Medicines.findById(req.params.id);
            handleError(cure, "Not Found");
            return res.status(200).json({data: cure, code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async findAllCures(req: IFilter, res: Response) {
        try {
            // filters
            const filters = isNotEmpty(req.filters) ? req.filters : {type: 'cures'};

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
            return res.status(200).json({data: cures, count: cureCount, code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async createCure(req: Request, res: Response) {
        try {
            const cureData: IMedicines = req.body;
            const isExist = await Medicines.findOne({name: cureData.name}).exec();
            if (isExist) {
                throw new Error("Conflict");
            }
            const cureToAdd = await new Medicines(cureData).save();
            handleError(cureToAdd, "Bad Request");
            return res.status(201).json({data: cureData, message: "Cure has been created", code: 201}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async updateCure(req: Request, res: Response) {
        try {
            const cureData: IMedicines = req.body;
            const cure = await Medicines.findByIdAndUpdate({_id: req.params.id}, cureData, {new: true});
            handleError(cure, "Not Found");
            return res.status(200).json({
                data: cure,
                message: `Cure with id:${req.params.id} has been updated`,
                code: 200
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async updateCurePartially(req: IPatchRequest<Partial<IMedicines>>, res: Response) {
        const {id} = req.params;
        try{
            const cureToUpdate = await Medicines.findByIdAndUpdate(
                id,
                {
                    $set: {
                        ...(req.body.cures && {
                            'cures.requiredPrescription': req.body.cures.requiredPrescription,
                            'cures.form': req.body.cures.form,
                            'cures.ingredients': req.body.cures.ingredients,
                            'cures.category': req.body.cures.category,
                            'cures.recommendation': req.body.cures.recommendation
                        }),
                        ...(req.body.cures.singleDose && {
                            'cures.singleDose.unit': req.body.cures.singleDose.unit,
                            'cures.singleDose.value': req.body.cures.singleDose.value
                        }),
                    }
                },
                {new: true}
            );
            handleError(cureToUpdate, "Not Found");
            return res.status(200).json({
                data: cureToUpdate,
                message: `Cure with id:${req.params.id} has been updated`,
                code: 200
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async deleteCure(req: Request, res: Response) {
        try {
            const cureToDelete = await Medicines.findByIdAndRemove({_id: req.params.id});
            handleError(cureToDelete, "Not Found");
            return res.status(204).json({
                message: `No content. Cure with id:${req.params.id} has been deleted`,
                code: 204
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    }

}