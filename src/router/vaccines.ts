import {Router} from 'express';
import {filterMedicines} from '../middlewares/filters';
import {vaccinesController} from '../controllers/vaccinesController';

const router = Router();

export default (): Router => {
    const api = Router();

    // GET /vaccines
    api.get('/', filterMedicines, vaccinesController.findAllVaccines);

    // GET /vaccines/:id
    api.get('/:id', filterMedicines, vaccinesController.findVaccine);

    // POST /vaccines
    api.post('/', filterMedicines, vaccinesController.createVaccine);

    // PUT /vaccines/:id
    api.put('/:id', filterMedicines, vaccinesController.updateVaccine);

    // PATCH /vaccines/:id
    api.patch('/:id', filterMedicines, vaccinesController.updateVaccinePartially);

    // DELETE /vaccines/:id
    api.delete('/:id', filterMedicines, vaccinesController.deleteVaccine);

    return api;
}