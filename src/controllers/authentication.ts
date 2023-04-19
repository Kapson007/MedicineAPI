import {getUserByEmail, createUser} from '../controllers/UserController'
import {Request, Response} from 'express';
import { random, authentication } from '../utils/authUtils';

export const register = (req: Request, res: Response) => {
    try{
        const {email, name, password } = req.body;

        if(!email || !name || !password){
            throw Error("Missing fields");
        }

        const existingUser = getUserByEmail(email);

        if(existingUser){
            throw Error("User already exists");
        }

        const salt = random();
        const user = createUser({
            username: name,
            email,
            authentication: {
                password: authentication(salt, password),
                salt
            }
        })

        return res.status(201).json(user).end();


    }catch(error){
        console.log(error);
        return res.status(400);
    }
}