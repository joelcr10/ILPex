import { Request, Response } from 'express';
import getCourseCollectionNamesServices from '../../services/adminServices/getCourseCollectionNamesServices';
import getCoursesByCourseSetIdServices from '../../services/adminServices/getCoursesByCourseSetIdServices';

const getAllCourseCollectionController = async(req : Request, res : Response) => {
    try {
        const courseList = [];
        const courseCollection = await getCourseCollectionNamesServices();

        for (const courseCollectionObj of courseCollection) {
            const course_set_id = courseCollectionObj.course_set_id;
            const course_list = await getCoursesByCourseSetIdServices(course_set_id);
            const courseSetObject = {
                course_set_name: courseCollectionObj.course_set_name,
                number_of_days : course_list.numberOfDays,
                number_of_courses : course_list.numberOfCourses,
                course_list: course_list.courseSetNames
            };
            courseList.push(courseSetObject);
        }
        return res.status(200).json({course_data : courseList});
    }
    catch(error) {
        return res.status(404).json({error : 'Error while fetching course names'});
    }
}
export default getAllCourseCollectionController;