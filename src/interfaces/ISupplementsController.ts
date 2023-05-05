import {Request, Response} from 'express';

export interface ISupplementController {
    findSupplement(req: Request, res: Response): Promise<Response>;
    findAllSupplemments(req: Request, res: Response): Promise<Response>;
    createSupplement(req: Request, res: Response): Promise<Response>;
    updateSupplement(req: Request, res: Response): Promise<Response>;
    updateSupplementPartially(req: Request, res: Response): void;
    deleteSupplement(req: Request, res: Response): Promise<Response>;
}