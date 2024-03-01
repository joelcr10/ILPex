import Assessment from "../../../models/assessments";
import Users from "../../../models/users";

const uploadAssessmentService = async(assessment_name : string,user : Users)=>{
    const assessment = await Assessment.create({assessment_name : assessment_name,createdBy : user.user_id},{raw:true});
    return assessment;
}

export default uploadAssessmentService;