import express,{Request,Response} from 'express';
import findBatchesAssignedToACourseByCourseSetIdServices from '../../services/l_and_d_Services/findBatchesAssignedToACourseByCourseSetIdServices';
import findEndDateOfTheBatchByBatchIdServices from '../../services/l_and_d_Services/findEndDateOfTheBatchByBatchIdServices';
import deactivateCoursesInTheListServices from '../../services/deactivateCoursesInTheListServices';

const deactivateCourseController = async(req : Request, res : Response)=> {
    try {
        const {course_set_id} = req.body;
        console.log("Course Set ID --------", req.body);
        if(!course_set_id)
            return res.status(405).json({error : "Course Set ID is missing!"})
        const batchesAssignedToThisCourse = await findBatchesAssignedToACourseByCourseSetIdServices(course_set_id);
        if(batchesAssignedToThisCourse)
        {
            for(const obj of batchesAssignedToThisCourse)
            {
                const endDateOfTheBatch = await findEndDateOfTheBatchByBatchIdServices(obj.batch_id);
                if(endDateOfTheBatch)
                {
                    const current_date = new Date();
                    if(endDateOfTheBatch >= current_date)
                        return res.status(402).json({error : "Cannot delete this course since it is already assigned to an Active Batch. Try removing the batch and then deleting the course"});
                }
                console.log("Hi-------");
            }
        }
        console.log("Hi-------");
        const deactivateCoursesStatus = await deactivateCoursesInTheListServices(course_set_id);
        if(deactivateCoursesStatus)
            return res.status(200).json({message : "The Course Collection has been removed Successfully"});
        else
            return res.status(404).json({error : "Error while deleting the Course list!"});
    }
    catch(error) {
        return res.status(404).json({error : "Error while deleting the course list"});
    }
}

export default deactivateCourseController;