import {Request, Response} from 'express';
import percipioReport from '../../services/TraineeServices/assessmentServices/percipioReport';


const percipioReportController = async (req:Request, res: Response) =>{
    try{
        percipioReport();

        res.status(200).json({message: 'percipio success'});
    }catch(error){
        console.log(error);
        res.status(404).json({message: error})
    }
}

export default percipioReportController;