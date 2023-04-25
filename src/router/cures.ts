import {Router} from 'express';
import curesController from '../controllers/curesController';
import {filterMedicines} from '../middlewares/filters';

export default () => {
    const api = Router();

    // GET /cures/:id
    api.get('/:id', filterMedicines, curesController.findCure);

    // GET /cures
    api.get('/', filterMedicines, curesController.findAllCures)

    return api;
}
