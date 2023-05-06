import {Request, Response} from 'express';
import {IVaccineController} from '../interfaces/IVaccineController';
import {errorMachine, handleError} from '../utils/errorHandlingUtils';
import {Medicines} from '../schemas/medicines';
import {IFilter} from '../interfaces/IMedicineController';
import {isNotEmpty} from '../middlewares/filters';
import {IMedicines, Order, IPatchRequest} from '../interfaces/IMedicines';

export const vaccinesController: IVaccineController = {
    async findVaccine(req: Request, res: Response) {
        try {
            const vaccine = await Medicines.findById(req.params.id);
            handleError(vaccine, "Not Found");
            return res.status(200).json({data: vaccine, code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },
    async findAllVaccines(req: IFilter, res: Response) {
        try {
            //filters
            const filters = isNotEmpty(req.filters) ? req.filters : {type: 'vaccines'};

            //pagination
            const offset = parseInt(req.query.offset as string) || 0;
            const per_page = parseInt(req.query.per_page as string) || 10;

            //sorting
            const sort_by = req.query.sort_by as string || 'createdAt';
            const order_by = req.query.order_by as Order || 'desc';
            const sortFilter = {[sort_by]: order_by};

            const vaccinesPromise =
                Medicines
                    .find(filters)
                    .skip(offset)
                    .limit(per_page)
                    .sort(sortFilter);

            const vaccinesCountPromise = Medicines.count(filters);
            const [vaccines, vaccinesCount] = await Promise.all([vaccinesPromise, vaccinesCountPromise]);
            handleError(vaccines, "Not Found");
            return res.status(200).json({data: vaccines, count: vaccinesCount, code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },
    async createVaccine(req: Request, res: Response) {
        try {
            const vaccineData = req.body;
            const isExist = await Medicines.findOne({name: vaccineData.name}).exec();
            if (isExist) {
                throw new Error("Conflict");
            }
            await new Medicines(vaccineData).save();
            handleError(vaccineData, "Not Found");
            return res.status(201).json({data: vaccineData, message: "Vaccine has been created", code: 201}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },
    async updateVaccine(req: Request, res: Response) {
        try {
            const vaccineData: IMedicines = req.body;
            const vaccineToUpdate = await Medicines.findByIdAndUpdate({_id: req.params.id}, vaccineData, {new: true});
            handleError(vaccineToUpdate, "Not Found");
            return res.status(200).json({
                data: vaccineToUpdate,
                message: "Vaccine has been updated",
                code: 200
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },
    async updateVaccinePartially(req: IPatchRequest<Partial<IMedicines>>, res: Response) {
        const {id} = req.params;
        try {
            const vaccineToUpdate = await Medicines.findByIdAndUpdate(
                id,
                {
                    $set: {
                        ...({'vaccines.form': req.body.vaccines.form}),
                        ...({'vaccines.category': req.body.vaccines.category}),
                        ...({'vaccines.singleDose.unit': req.body.vaccines.singleDose.unit}),
                        ...({'vaccines.singleDose.value': req.body.vaccines.singleDose.value}),
                        ...({'vaccines.ingredients': req.body.vaccines.ingredients}),
                        ...({'vaccines.minAgeOfDose': req.body.vaccines.minAgeOfDose}),
                        ...({'vaccines.isObligatory': req.body.vaccines.isObligatory}),
                    }
                },
                {new: true}
            );
            handleError(vaccineToUpdate, "Not Found");
            return res.status(200).json({
                data: vaccineToUpdate,
                message: `Vaccine with id:${req.params.id} has been updated`,
                code: 200
            }).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async deleteVaccine(req: Request, res: Response) {
        try {
            const vaccineToDelete = await Medicines.findByIdAndDelete(req.params.id);
            handleError(vaccineToDelete, "Not Found");
            return res.status(204).json({
                message: `Vaccine with ${req.params.id} has been deleted`,
                code: 204
            }).end()
        } catch (err) {
            errorMachine(res, err);
        }
    }
}