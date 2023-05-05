import {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { errorMachine } from '../utils/errorHandlingUtils';

dotenv.config();

function authorize(req: Request, res: Response, next: NextFunction){
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            throw new Error("Missing token");
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err){
                console.log(err.message);
                if(err.message === "jwt expired") throw new Error("Token expired");
                throw new Error("Invalid token");
            }
            next();
        });
    }catch(err){
        switch (err.message) {
            case "Missing token":
                res.status(401).json({message: "Unauthorized. Missing token", code: 401});
                break;
            case "Invalid token":
                res.status(403).json({message: "Forbidden. Invalid token", code: 403});
                break;
            case "Token expired":
                res.status(403).json({message: "Forbidden. Token expired", code: 403});
                break;
        }
    }
}



export default authorize;