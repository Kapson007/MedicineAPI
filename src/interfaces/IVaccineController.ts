import {Request, Response } from "express";

export interface IVaccineController{
    findVaccine(req: Request, res: Response): Promise<Response>;
    findAllVaccines(req: Request, res: Response): Promise<Response>;
    createVaccine(req: Request, res: Response): Promise<Response>;
    updateVaccine(req: Request, res: Response): Promise<Response>;
    updateVaccinePartially(req: Request, res: Response): void;
    deleteVaccine(req: Request, res: Response): Promise<Response>;
}