import { Request, Response } from "express";
import {IMedicines} from '../interfaces/IMedicines';
import {Order} from '../interfaces/IMedicines';
export interface IMedicineController {
    findMedicine(req: Request, res: Response): void;
    findAllMedicines(req: Request, res: Response): void;
    createMedicine(req: Request, res: Response): void;
    updateMedicine(req: Request, res: Response): void;
    updateMedicinePartially(req: Request, res: Response): void;
    deleteMedicine(req: Request, res: Response): void;
}

export interface IFilter extends Request {
    filters: unknown;
}