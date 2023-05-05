import {Router, Response, Request, NextFunction} from 'express';
import {Medicines} from '../schemas/medicines';
import {IMedicines, Order} from '../interfaces/IMedicines';
import {IMedicineController, IFilter} from '../interfaces/IMedicineController';
import {handleError} from '../utils/errorHandlingUtils'
import {errorMachine} from '../utils/errorHandlingUtils'

export const medicinesController: IMedicineController = {
    async findMedicine(req: Request, res: Response) {
        try {
            const medicine = await Medicines.findById(req.params.id);
            handleError(medicine, "Not Found");
            return res.status(200).json({data: medicine, code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }

    },

    async findAllMedicines(req: IFilter, res: Response) {
        try {
            // return medicines from the newest to the oldest
            const offset = parseInt(req.query.offset as string) || 0
            const perPage = parseInt(req.query.per_page as string) || 10;

            // sorting logic based on query params and fallbacks, passing to config object
            const sort_by = req.query.sort_by as string || "createdAt";
            const order_by = req.query.order_by as Order || "desc";
            const sortFilter = {[sort_by]: order_by};

            const medicinesPromise = Medicines.find(req.filters).skip(offset).limit(perPage).sort(sortFilter);
            const medicinesCountPromise = Medicines.count(req.filters);
            const [medicines, medicinesCount] = await Promise.all([medicinesPromise, medicinesCountPromise])

            handleError(medicines, "Not Found")
            handleError(medicinesCount, "Not Found")
            return res.status(200).json({data: medicines, count: medicinesCount, code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async createMedicine(req: Request, res: Response) {
        try {
            const medicineData: IMedicines = req.body;
            const isExist = await Medicines.findOne({name: medicineData.name}).exec();
            if(isExist) {
                throw new Error("Conflict");
            }
            const medicine = await new Medicines(medicineData).save();
            return res.status(201).send({data: medicineData, message: "Medicine has been created"});
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async updateMedicine(req: Request, res: Response) {
        try {
            const medicineData: IMedicines = req.body;
            const updatedMedicine = await Medicines.findByIdAndUpdate({_id: req.params.id}, medicineData, {new: true});
            handleError(medicineData, "Not Found")
            return res.status(200).json({data: medicineData, message: "Resource has been updated", code: 200}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async updateMedicinePartially(req: Request, res: Response) {
        try {
            const {...rest} = req.body;
            const updatedMedicine = await Medicines.findByIdAndUpdate({_id: req.params.id}, {
                ...rest
            }, {new: true});
            handleError(updatedMedicine, "Not Found");
            return res.status(204).json({message: "Resource has been updated partiallly", code: 204}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    },

    async deleteMedicine(req: Request, res: Response) {
        try {
            const medicineToUpdate = await Medicines.findByIdAndRemove({_id: req.params.id});
            handleError(medicineToUpdate, "Not Found");
            return res.status(204).json({message: "No Content. Resource has been deleted", code: 204}).end();
        } catch (err) {
            errorMachine(res, err);
        }
    }
}