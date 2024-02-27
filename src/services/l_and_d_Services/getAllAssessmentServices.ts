import Assessments from "../../models/assessments";
import Batches from "../../models/batches";


const getAllAsssessmentsServices=async(
    offset:number,
    sortKey:string,
    sortOrder:string)=>{

    const assessments=await Assessments.findAll({
        //joining Batches table
        include:[{
            model:Batches,
            required:true,
            attributes: ['batch_name']
        },
    ],
    order: [[sortKey, sortOrder]],
    offset: offset,
    limit: 5,
    attributes: ['assessment_name', 'assessment_date'],
    });

    return assessments;
}

export default getAllAsssessmentsServices;
  