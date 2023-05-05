import {getUserByEmail, createUser} from '../controllers/UserController'
import {Request, Response} from 'express';
import {random, authentication} from '../utils/authUtils';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {

    try {
        const {email, password, id} = await req.body;

        if (!email || !password || !id) {
            console.log(email, password);
            throw Error("Missing fields");
        }
        // to get access to the hased password and salt
        const user = await getUserByEmail(email).select("+authentication.password +authentication.salt");

        if (!user) {
            return res.status(404).json({
                status: "User does not exist!",
                statusCode: 404
            }).end();
        }

        const expectedPassword = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedPassword) {
            return res.status(403).json({
                status: "Invalid Credentials",
                statusCode: 403
            }).end();
        }

        const accessToken = jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: 120});
        const refreshToken = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 1020});

        return res.status(201).json({
            status: "Logged in",
            accessToken,
            refreshToken,
            statusCode: 201,
        }).end();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error.message,
            stautsCode: 400
        }).end();
    }
}


export const register = async (req: Request, res: Response) => {
    try {
        const {email, username, password} = req.body;

        if (!email || !username || !password) {
            throw Error("Missing fields");
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
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
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message}).end();
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).json({message: "Unauthorized. Missing token", code: 401});

    try {
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.status(403).json({message: "Forbidden. Invalid refresh token.", code: 403});
    }
    const accessToken = jwt.sign({id: req.body.id}, process.env.TOKEN_SECRET, {expiresIn: 120});

    return res.status(201).json({accessToken}).end();
}