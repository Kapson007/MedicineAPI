import {Request, Response} from 'express';
import {IVaccineController} from '../interfaces/IVaccineController';

export const vaccinesController: IVaccineController = {
    findVaccine(req: Request, res: Response): void {},
    findAllVaccines(req: Request, res: Response): void {},
    createVaccine(req: Request, res: Response): void {},
    updateVaccine(req: Request, res: Response): void {},
    updateVaccinePartially(req: Request, res: Response): void {},
    deleteVaccine(req: Request, res: Response): void {}
}