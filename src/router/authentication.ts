import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/authentication';

export default (router: Router) => {
    router.post('/register', register);
    router.post('/login', login);
    router.post('/refresh-token', refreshToken);
}