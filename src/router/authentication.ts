import { Router } from 'express';
import { register } from '../controllers/authentication';
import { login } from '../controllers/authentication';

export default (router: Router) => {
    router.post('/register', register)
    router.post('/login', login)
}