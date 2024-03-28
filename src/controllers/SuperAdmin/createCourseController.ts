
import {Request, Response} from 'express';
import createCourseServices from '../../services/adminServices/createCourseServices';
import convertCourseList from '../../services/adminServices/convertCourseList';
import findDuplicateCourseSetServices from '../../services/l_and_d_Services/findDuplicateCourseSetServices';
import createCourseSetServices from '../../services/l_and_d_Services/createCourseSetServices';


const createCourseController = async (req: Request, res: Response) =>{
    try{

        const {createdBy, course_name} = req.body;    
        const file = req.file;

        if(!createdBy){
            return res.status(404).json({message: "invalid createdBY"});
        }
        
        if(file)
        {
            const findDuplicateCourseSet = await findDuplicateCourseSetServices(course_name);
            if(findDuplicateCourseSet)
            {
                return res.status(404).json({error : "This Course List Already Exists!"});
            }
            else
            {
                const createCourseSet = await createCourseSetServices(course_name, createdBy);
                if(createCourseSet)
                {
                    const courseSetId = createCourseSet.course_set_id;

                    const courseList = await convertCourseList(file.path); //converts the Excel data to array of Course details objects
                    
                    if(courseList==null){
                        return res.status(422).json({message: "Error Parsing The excel file"});
                    }
                    
                    const newCourse = await createCourseServices(courseList, courseSetId); //bulk creates the courses to the DB

                    if(newCourse==null){
                        return res.status(500).json({message: "couldn't create table"});
                    }

                    return res.status(200).json({message: 'created new course'});

                }
                else
                {

                }
            }            
        }
        

    }catch(error){
        return res.status(500).json({message: error});
    }
}


export default createCourseController;