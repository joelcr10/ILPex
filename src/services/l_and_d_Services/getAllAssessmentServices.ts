import Assessments from "../../models/assessments";
import Batches from "../../models/batches";


const getAllAsssessmentsServices=async(
    offset:number,
    sortKey:string,
    sortOrder:string)=>{

    const assessments=await Assessments.findAll({

    order: [[sortKey, sortOrder]],
    offset: offset,
    // limit: 5,
    attributes: ['assessment_id', 'assessment_name'],
    });

    return assessments;
}

export default getAllAsssessmentsServices;
  