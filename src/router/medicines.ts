import {Router, Response, Request} from 'express';
import medicinesController from '../controllers/medicinesController';


export default () => {
    const api = Router();

    api.get('/', medicinesController.findAll)

    return api;
}