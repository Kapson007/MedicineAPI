import {getUserByEmail, createUser} from '../controllers/UserController'
import {Request, Response} from 'express';
import { random, authentication } from '../utils/authUtils';

export const login = async (req: Request, res: Response) => {

    try{
        const { email, password } = await req.body;

        if(!email || !password){
            console.log(email, password);
            throw Error("Missing fields");
        }

        // to get access to the hased password and salt
        const user = await getUserByEmail(email).select("+authentication.password +authentication.salt");

        if(!user){
            return res.status(404).json({
                status: "User does not exist!",
                statusCode: 404
            }).end();
        }

        const expectedPassword = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedPassword){
            return res.status(403).json({
                status: "Invalid Credentials",
                statusCode: 403
            }).end();
        }

        return res.status(201).json({
            status:"Logged in",
            statusCode: 201,
        }).end();

    }catch(error){
        console.log(error);
        return res.status(400).json({
            error: error.message,
            stautsCode: 400
        }).end();
    }
}


export const register = async (req: Request, res: Response) => {
    try{
        const {email, username, password } = req.body;

        if(!email || !username || !password){
            throw Error("Missing fields");
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            throw Error("User already exists");
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: authentication(salt, password),
                salt
            }
        })
        return res.status(201).json(user).end();
    }catch(error){
        console.log(error);
        return res.status(400).json({error: error.message}).end();
    }
}