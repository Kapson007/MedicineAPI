import {Request, Response} from 'express';

export interface ISupplementController {
    findSupplement(req: Request, res: Response): void;
    findAllSupplemments(req: Request, res: Response): void;
    createSupplement(req: Request, res: Response): void;
    updateSupplement(req: Request, res: Response): void;
    updateSupplementPartially(req: Request, res: Response): void;
    deleteSupplement(req: Request, res: Response): void;
}