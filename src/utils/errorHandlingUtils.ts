import {Response} from 'express';

type ErrorMessage = "Not Found" | "Bad Request" | "Forbidden" | "Conflict";

export const handleError = (response: unknown, errMessage: ErrorMessage) => {
    if (!response) throw Error(errMessage)
}

export const errorMachine = (res: Response, err: Error) => {
    switch (err.message) {
        case "Not Found":
            res.status(404).json({message: err.message, code: 404}).end();
            break;
        case "Bad Request":
            res.status(400).json({message: "Bad Request", code: 400}).end();
            break;
        case "Conflict":
            res.status(409).json({message: "Conflict. Resource already exists", code: 409}).end();
            break;
        default:
            res.status(500).json({message: "Internal Server Error", code: 500}).end();
            break;
    }
}