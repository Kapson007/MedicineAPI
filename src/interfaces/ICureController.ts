import {Request, Response} from 'express';

export interface ICureController {
    findCure(req: Request, res: Response): Promise<Response>;
    findAllCures(req: Request, res: Response): Promise<Response>;
    createCure(req: Request, res: Response): Promise<Response>;
    updateCure(req: Request, res: Response): Promise<Response>;
    updateCurePartially(req: Request, res: Response): void;
    deleteCure(req: Request, res: Response): Promise<Response>;
}