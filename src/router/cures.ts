import {Router} from 'express';
import {curesController} from '../controllers/curesController';
import {filterMedicines} from '../middlewares/filters';

export default () => {
    const api = Router();

    // GET /cures
    api.get('/', filterMedicines, curesController.findAllCures)

    // GET /cures/:id
    api.get('/:id', curesController.findCure);

    // POST /cures
    api.post('/', curesController.createCure);

    // PUT /cures/:id
    api.put('/:id', curesController.updateCure);

    // PATCH /cures/:id
    api.patch('/:id', curesController.updateCurePartially);

    // DELETE /cures/:id
    api.delete('/:id', curesController.deleteCure);

    return api;
}
