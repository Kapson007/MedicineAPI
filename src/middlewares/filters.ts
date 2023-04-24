import {Request, Response, NextFunction} from 'express';
import {IFilter} from '../interfaces/medicineController';
import {Medicines} from '../schemas/medicines'
import _ from 'lodash';

export const filterMedicines = (req: IFilter, res: Response, next: NextFunction) => {
    const avaliableFilters = Object.keys(Medicines.schema.paths);
    // using lodash to check if user is trying to filter by an invalid field
    // lodash pickby takes an object with props passed as queries and check if they exists in medicine schema model
    // then returns an object with only the valid props belongs to medicine schema model
    // then middleware pass stearing to next middleware
    req.filters = _.pickBy(req.query, (value, key) => avaliableFilters.includes(key));
    next();
}