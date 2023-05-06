import {Router} from 'express';
import {filterMedicines} from '../middlewares/filters';
import {vaccinesController} from '../controllers/vaccinesController';
import authorize from '../middlewares/authorization';

const router = Router();

export default (): Router => {
    const api = Router();

    // GET /vaccines
    api.get('/', filterMedicines, vaccinesController.findAllVaccines);

    // GET /vaccines/:id
    api.get('/:id', authorize, vaccinesController.findVaccine);

    // POST /vaccines
    api.post('/', authorize, vaccinesController.createVaccine);

    // PUT /vaccines/:id
    api.put('/:id', authorize, vaccinesController.updateVaccine);

    // PATCH /vaccines/:id
    api.patch('/:id', authorize, vaccinesController.updateVaccinePartially);

    // DELETE /vaccines/:id
    api.delete('/:id', authorize, vaccinesController.deleteVaccine);

    return api;
}