import Courses from "../../models/courses";
import * as XLSX from 'xlsx';


const test = 'ILP E-Learning Curriculum \r\n(Pre requisite learning before joining for offline session)';
interface ExcelRow {
    __EMPTY: string;
    __EMPTY_1: string;
    __EMPTY_2: string;
    __EMPTY_3: string;
    __EMPTY_4: string;
    __EMPTY_5: string;

}

const inputPath = 'D:/ILPex/TemporaryFileStorage/CourseList.xlsx';


const createCourseServices = async (
    course_name: string,
    course_duration: string,
    course_type: string,
    day_number: number,
    createdBy: number) =>{

    try{
        const batchWorkBook = XLSX.readFile(inputPath);
        const batchSheetName = batchWorkBook.SheetNames[1];
        console.log(batchSheetName);
        const batchSheet = batchWorkBook.Sheets[batchSheetName];

        const jsonBatchData: any = XLSX.utils.sheet_to_json<ExcelRow>(batchSheet);
        
        // console.log(jsonBatchData[0]['__EMPTY'],jsonBatchData[0]['__EMPTY_1'])

        jsonBatchData.shift();
        jsonBatchData.pop();

       
        
        day_number = 1;
        for(const row of jsonBatchData){    
            
            const field2 = row['__EMPTY_3'];

            //checking for line which only gives the total number of hours from a particular day
            if(field2.startsWith('Day') && field2.endsWith('ours')){
                day_number++;
            }
            else{
                course_name = row['__EMPTY_2'];  

                if(course_name.startsWith('https://')){
                    //taking the course-category as the course name when the course name is a link
                    course_name = row['__EMPTY_3'];
                }
                course_type = row['__EMPTY_1'];

                if(course_type===undefined){
                    course_type = 'none';
                }

                course_duration = row['__EMPTY_4'];
                
                if(course_duration===undefined){
                    course_duration = 'none';
                }


                const newCourse = await Courses.create({
                    course_name,
                    course_duration,
                    course_type,
                    day_number,
                    createdBy
                });


                if(newCourse!==null){
                    console.log("Created a course");
                }


                // console.log(row);
            }


        }   
        
    }catch(error){
        console.log(error);
        return null
    }

    return 'success';

}

export default createCourseServices;