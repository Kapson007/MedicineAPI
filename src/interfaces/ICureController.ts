import {Request, Response} from 'express';


export interface ICureController {
    findCure(req: Request, res: Response): void;
    findAllCures(req: Request, res: Response): void;
    createCure(req: Request, res: Response): void;
    updateCure(req: Request, res: Response): void;
    updateCurePartially(req: Request, res: Response): void;
    deleteCure(req: Request, res: Response): void;
}