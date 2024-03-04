
import {Request, Response} from 'express';
import createCourseServices from '../../services/adminServices/createCourseServices';
import convertCourseList from '../../services/adminServices/convertCourseList';
import multer from 'multer';

const inputPath = 'D:/ILPex/TemporaryFileStorage/CourseList.xlsx';





const createCourseController = async (req: Request, res: Response) =>{
    try{
        const {createdBy} = req.body;    
       
        if(!createdBy){
            return res.status(404).json({message: "invalid createdBY"});
        }
        

        const courseList = await convertCourseList(inputPath); //converts the Excel data to array of Course details objects

        if(courseList==null){
            return res.status(422).json({message: "Error Parsing The excel file"});
        }


        const newCourse = await createCourseServices(courseList); //bulk creates the courses to the DB

        if(newCourse==null){
            return res.status(500).json({message: "couldn't create table"});
        }

        return res.status(200).json({message: 'created new course'});

    }catch(error){
        return res.status(500).json({message: error});
    }
}


export default createCourseController;