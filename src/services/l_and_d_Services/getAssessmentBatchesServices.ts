import Assessment from "../../../types/modelTypes/assessments";
import Assessment_Batch_Allocation from "../../models/assessment_batch_allocation";
import Batches from "../../models/batches";


const getAssessmentBatch=async(assessment_id:number)=>{

    const traineeBatch=await Assessment_Batch_Allocation.findAll(
        {
            include:[
                {
                  //Join Batches model
                  model:Batches,
                  required:true,
                   attributes: ['batch_name']
              },
              {
                //Join Assessment model
                model:Assessment,
                required:true,
                 attributes: ['assessment_name']
            },

            ],
            where:{assessment_id:assessment_id},
            attributes:['assessment_id','batch_id','start_date','end_date']

        }
    )

    return traineeBatch;

}



export default getAssessmentBatch;