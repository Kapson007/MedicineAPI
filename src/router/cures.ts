import {Router} from 'express';
import {curesController} from '../controllers/curesController';
import {filterMedicines} from '../middlewares/filters';
import authorize from '../middlewares/authorization';

export default (): Router => {
    const api = Router();

    // GET /cures
    api.get('/', filterMedicines, curesController.findAllCures)

    // GET /cures/:id
    api.get('/:id', curesController.findCure);

    // POST /cures
    api.post('/', authorize, curesController.createCure);

    // PUT /cures/:id
    api.put('/:id', authorize, curesController.updateCure);

    // PATCH /cures/:id
    api.patch('/:id', authorize, curesController.updateCurePartially);

    // DELETE /cures/:id
    api.delete('/:id', authorize, curesController.deleteCure);

    return api;
}
