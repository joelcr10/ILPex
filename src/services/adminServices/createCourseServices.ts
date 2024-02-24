import Courses from "../../models/courses";
import * as XLSX from 'xlsx';


const test = 'ILP E-Learning Curriculum \r\n(Pre requisite learning before joining for offline session)';
interface ExcelRow {
    Name : string;
    Role : string;
    Email : string;
    Password : string;
    __EMPTY: string;
    __EMPTY_1: string;
    __EMPTY_2: string;
    __EMPTY_3: string;
    __EMPTY_4: string;
    __EMPTY_5: string;
    test: string;
}

const inputPath = 'D:/TemporaryFileStorage/CourseList.xlsx';


const createCourseServices = async (
    course_name: string,
    course_duration: string,
    course_type: string,
    day_number: number,
    createdBy: number) =>{

    
    // try{
    //     const batchWorkBook = XLSX.readFile(inputPath);
    //     const batchSheetName = batchWorkBook.SheetNames[0];
    //     const batchSheet = batchWorkBook.Sheets[batchSheetName];

    //     const jsonBatchData: any = XLSX.utils.sheet_to_json<ExcelRow>(batchSheet);
        
    //     console.log(jsonBatchData[0]['__EMPTY'],jsonBatchData[0]['__EMPTY_1'])

    //     jsonBatchData.shift();
       
    //     let day = 1;
    //     for(const row of jsonBatchData){
    //         course_name = '';
    //         if(Object.keys(row).length===2){
    //             const {__EMPTY_3} = row;
    //             if(__EMPTY_3===undefined){
    //                 day++;
    //                 console.log(row)
    //             }else{
    //                 console.log(row)
    //             }            
    //         }else{
    //             course_name = row['__EMPTY_3'];
    //             course_type = row['__EMPTY_2'];
    //             // console.log(day,course_type, course_name);
    //             console.log(row)
    //         }


    //     }   
        
    // }catch(error){
    //     console.log(error);
    //     return null
    // }

    const newCourse = await Courses.create({
            course_name,
            course_duration,
            course_type,
            day_number,
            createdBy
        });

    return newCourse;

}

export default createCourseServices;