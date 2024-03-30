import { Request, Response } from 'express';
import getCoursesByCourseSetIdServices from '../../services/adminServices/getCoursesByCourseSetIdServices';
import getCourseCollectionOfABatchByBatchIDServices from './getCourseCollectionOfABatchByBatchIDServices';
import getCourseCollectionNameByCourseSetIdServices from './getCourseCollectionNameByCourseSetIdServices';

const getAllCourseCollectionController = async(req : Request, res : Response) => {
    try {
        const batch_id :number = parseInt(req.params.batch_id as string);
        const courseCollection = await getCourseCollectionOfABatchByBatchIDServices(batch_id);
        const courseCollectionName = await getCourseCollectionNameByCourseSetIdServices(courseCollection.course_set_id);
        const course_set_id = courseCollection.course_set_id;
        const course_list = await getCoursesByCourseSetIdServices(course_set_id);
        const courseSetObject = {
            course_set_id : course_set_id,
            course_set_name: courseCollectionName.course_set_name,
            number_of_days : course_list.numberOfDays,
            number_of_courses : course_list.numberOfCourses,
            course_list: course_list.courseSetNames
        }
        return res.status(200).json({course_data : courseSetObject});
    }
    catch(error) {
        return res.status(404).json({error : 'Error while fetching course names'});
    }
}
export default getAllCourseCollectionController;