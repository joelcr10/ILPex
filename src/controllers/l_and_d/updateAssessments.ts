import { Request, Response } from 'express';
import updateAssessment from '../../services/l_and_d_services/updateAssessment';

const updateAssessmentController = async(req:Request,res:Response)=>{
    updateAssessment(req,res);
};

export default updateAssessmentController;