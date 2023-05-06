import {Router} from 'express';
import {supplementsController} from '../controllers/supplementsController';
import {filterMedicines} from '../middlewares/filters';
import authorize from '../middlewares/authorization';

const router = Router();

export default (): Router => {
    const api = Router();

    // GET /supplements
    api.get('/', filterMedicines, supplementsController.findAllSupplemments)

    // GET /supplements/:id
    api.get('/:id', supplementsController.findSupplement);

    // POST /supplements
    api.post('/', authorize, supplementsController.createSupplement);

    // PUT /supplements/:id
    api.put('/:id', authorize, supplementsController.updateSupplement);

    // PATCH /supplements/:id
    api.patch('/:id', authorize, supplementsController.updateSupplementPartially);

    // DELETE /supplements/:id
    api.delete('/:id', authorize, supplementsController.deleteSupplement);

    return api
}