import Assessments from "../../models/assessments";
import Batches from "../../models/batches";


const getAllAsssessmentsServices=async()=>{

    const assessments=await Assessments.findAll({
        //joining Batches table
        include:[{
            model:Batches,
            required:true,
            attributes: ['batch_name']
        },
    ],
    attributes: ['assessment_name', 'assessment_date'],
    });

    return assessments;
}

export default getAllAsssessmentsServices;
  