import { Request, Response } from "express";
import {IMedicines} from '../interfaces/IMedicines';
import {Order} from '../interfaces/IMedicines';
export interface IMedicineController {
    findMedicine(req: Request, res: Response): Promise<Response>;
    findAllMedicines(req: Request, res: Response): Promise<Response>;
    createMedicine(req: Request, res: Response): Promise<Response>;
    updateMedicine(req: Request, res: Response): Promise<Response>;
    updateManufactuerAtomically(req: Request, res: Response): Promise<Response>;
    updateMedicinePartially(req: Request, res: Response): void;
    deleteMedicine(req: Request, res: Response): Promise<Response>;
}

export interface IFilter extends Request {
    filters: unknown;
}