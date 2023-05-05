import {Router} from 'express';
import {medicinesController} from '../controllers/medicinesController';
import {filterMedicines} from '../middlewares/filters';
import authorize from '../middlewares/authorization';

export default () => {
    const api = Router();

    // GET /medicines
    api.get('/', filterMedicines, medicinesController.findAllMedicines)

    // GET /medicines/:id
    api.get('/:id', medicinesController.findMedicine)

    // POST /medicines
    api.post('/',authorize ,medicinesController.createMedicine)

    // PUT /medicines/:id
    api.put('/:id', medicinesController.updateMedicine)

    // PUT /medicines - atomic operation example
    api.patch('/', medicinesController.updateManufactuer)

    // PATCH /medicines/:id
    api.patch('/:id', medicinesController.updateMedicinePartially)

    // DELETE /medicines/:id
    api.delete('/:id', medicinesController.deleteMedicine)

    return api;
}