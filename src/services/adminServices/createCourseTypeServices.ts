import {Request, Response} from 'express';
import Course_Type from '../../models/course_type';

const createCourseTypeServices = async (course_type_name: string) =>{
    const newCourse = await Course_Type.create({
            course_type:course_type_name,
        })   

    return newCourse;
}

export default createCourseTypeServices;