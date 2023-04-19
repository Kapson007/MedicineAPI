import {Router, Response, Request} from 'express';

export default () => {
    const api = Router();

    api.get('/', (req: Request, res: Response) => {
        res.send('Hello medicines');
    });

    return api;
}