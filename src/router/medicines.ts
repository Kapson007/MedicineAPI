import {Router} from 'express';
import {medicinesController} from '../controllers/medicinesController';
import {filterMedicines} from '../middlewares/filters';

export default ()  => {
    const api = Router();

    // GET /medicines
    api.get('/', filterMedicines, medicinesController.findAllMedicines)

    // GET /medicines/:id
    api.get('/:id', medicinesController.findMedicine)

    // POST /medicines
    api.post('/', medicinesController.createMedicine)

    // PUT /medicines/:id
    api.put('/:id', medicinesController.updateMedicine)

    // PATCH /medicines/:id
    api.patch('/:id', medicinesController.updateMedicinePartially)

    // DELETE /medicines/:id
    api.delete('/:id', medicinesController.deleteMedicine)

    return api;
}