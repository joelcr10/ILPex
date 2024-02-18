import createBatch from '../../services/l_and_d_Services/createBatch';
import { Request, Response } from 'express';

const createBatchController = async(req : Request, res : Response) : Promise<any> => {
    await createBatch(req, res);
}

export default createBatchController;