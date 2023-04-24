import {Router, Response, Request, NextFunction} from 'express';
import {Medicines} from '../schemas/Medicines';
import {IMedicines, Order} from '../interfaces/IMedicines';
import {IMedicineController} from '../interfaces/medicineController';
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

    async findAllMedicines(req: Request, res: Response) {
        try {
            // return medicines from the newest to the oldest
            const offset = parseInt(req.query.offset as string) || 0
            const perPage = parseInt(req.query.per_page as Order) || 10;
            const order = req.query.order as Order || "desc";

            const medicinesPromise = Medicines.find().skip(offset).limit(perPage).sort({createdAt: order});
            const medicinesCountPromise = Medicines.count();
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
            const medicine = await new Medicines(medicineData).save();
            handleError(medicine, "Bad Request");
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
            return res.status(200).json({data: rest, message: "Resource has been updated partiallly", code: 200}).end();
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