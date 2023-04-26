import {Request, Response, NextFunction} from 'express';
import {IFilter} from '../interfaces/IMedicineController';
import {Medicines} from '../schemas/medicines'
import {Cures} from '../schemas/cures'
import _ from 'lodash';

type filterExtended = 'cures' | 'supplements' | 'vaccines';
// using lodash to check if user is trying to filter by an invalid field
// lodash pickby takes an object with props passed as queries and check if they exists in medicine schema model
// then returns an object with only the valid props belongs to medicine schema model
// then middleware pass stearing to next middleware

export const filterMedicines = (req: IFilter, res: Response, next: NextFunction) => {
    let avaliableFilters: string[] = Object.keys(Medicines.schema.paths)
    // extract base path from endpoint and in terms of enpoint add filters to basic list
    switch(req.baseUrl.slice(1)) {
        case 'cures':{
            avaliableFilters = Array.from(new Set(avaliableFilters.concat(expandFilters('cures', Cures.schema.paths))));
        }
        // TODO: add filter for supplements and vaccines
        case 'supplements':{
            break;
        }
        case 'vaccines':{
            break;
        }
        // if endpoint is medicne, then not modify list and past basic filters
        default: break;
    }
    req.filters = _.pickBy(req.query, (value, key) => avaliableFilters.includes(key));
    next();
}

export const expandFilters = (path: filterExtended, schema: unknown): string[] => {
   return Object.keys(schema).map(filter =>`${path}.${filter}`);
}