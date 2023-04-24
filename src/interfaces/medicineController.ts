import { Request, Response } from "express";

export interface IMedicineController {
    findMedicine(req: Request, res: Response): void;
    findAllMedicines(req: Request, res: Response): void;
    createMedicine(req: Request, res: Response): void;
    updateMedicine(req: Request, res: Response): void;
    updateMedicinePartially(req: Request, res: Response): void;
    deleteMedicine(req: Request, res: Response): void;
}