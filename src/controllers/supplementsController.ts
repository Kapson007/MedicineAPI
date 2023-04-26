import {Request, Response} from 'express';
import {ISupplementController} from '../interfaces/ISupplementsController';

export const supplementsController: ISupplementController = {
    findSupplement(req: Request, res: Response): void {},
    findAllSupplemments(req: Request, res: Response): void {},
    createSupplement(req: Request, res: Response): void {},
    updateSupplement(req: Request, res: Response): void {},
    updateSupplementPartially(req: Request, res: Response): void {},
    deleteSupplement(req: Request, res: Response): void {}
}