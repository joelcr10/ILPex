import Assessment_Batch_Allocation from "../../models/assessment_batch_allocation";
import Assessments from "../../models/assessments";



const assessmentName=async(assessment_batch_allocation_id:number)=>{

    const assessment=await Assessment_Batch_Allocation.findOne({
        where:{assessment_batch_allocation_id:assessment_batch_allocation_id},
        attributes: ['assessment_batch_allocation_id','assessment_id'],
        include:[
            {
                model: Assessments,
                required: true,
                attributes: ['assessment_name']
              },
        ]
    })
    return assessment;
}

export default assessmentName;
