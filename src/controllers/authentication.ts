import {getUserByEmail, createUser} from '../controllers/UserController'
import {Request, Response} from 'express';
import { random, authentication } from '../utils/authUtils';

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