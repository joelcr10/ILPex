import { Request, Response } from 'express';
import getCourseCollectionNamesServices from '../../services/adminServices/getCourseCollectionNamesServices';
import getCoursesByCourseSetIdServices from '../../services/adminServices/getCoursesByCourseSetIdServices';

const getAllCourseNamesController = async(req : Request, res : Response) => {
    try {
        const courseCollection = await getCourseCollectionNamesServices();
        const courseList = [];
        for(const courseCollectionObj of courseCollection)
        {
            const course_set_id = courseCollectionObj.course_set_id;
            const course_list = await getCoursesByCourseSetIdServices(course_set_id);
            const courseSetObject = {
                course_set_id : course_set_id,
                course_set_name : courseCollectionObj.course_set_name,
                course_list : course_list
            }
            courseList.push(courseSetObject);

        }
        return res.status(200).json({course_data : courseList});
    }
    catch(error) {
        return res.status(404).json({error : 'Error while fetching course names'});
    }
}
export default getAllCourseNamesController;