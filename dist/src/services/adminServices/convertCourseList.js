"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const XLSX = tslib_1.__importStar(require("xlsx"));
const convertCourseList = (inputPath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const courseList = [];
    try {
        //converting Excel to json object
        const courseWorkBook = XLSX.readFile(inputPath);
        const courseSheetName = courseWorkBook.SheetNames[1];
        const courseSheet = courseWorkBook.Sheets[courseSheetName]; //getting the details of one sheet of excel
        const jsonBatchData = XLSX.utils.sheet_to_json(courseSheet);
        jsonBatchData.shift(); //remove the header from the jsonObject
        jsonBatchData.pop(); //remove the Total hours of the course line 
        let day_number = 1;
        let course_name;
        let course_duration;
        let course_type;
        let createdBy = 1;
        for (const row of jsonBatchData) {
            const field2 = row['__EMPTY_3'];
            if (field2.startsWith('Day') && field2.endsWith('ours')) { //checking for line which only gives the total number of hours from a particular day
                day_number++;
                if (day_number == 15) {
                    day_number = 15;
                }
            }
            else {
                course_name = row['__EMPTY_2'];
                if (course_name.startsWith('https://')) { //taking the course-category as the course name when the course name is a link
                    course_name = row['__EMPTY_3'];
                }
                course_type = row['__EMPTY_1'];
                if (course_type === undefined || course_type === ' ') { //for some courses the course_type is empty in excel
                    course_type = 'none';
                }
                course_duration = row['__EMPTY_4'];
                if (course_duration.length === 1 || typeof course_duration == "number") { //for some courses the course_duration is empty in excel
                    course_duration = Math.floor(Math.random() * 31) + "m " + Math.floor(Math.random() * 60) + "s";
                }
                //push each course details object to an array                
                courseList.push({
                    course_name: course_name,
                    course_duration: course_duration,
                    course_type: course_type,
                    day_number: day_number,
                    createdBy: createdBy
                });
                if (day_number == 15) {
                    day_number = 16;
                }
            }
        }
    }
    catch (error) {
        return null;
    }
    return courseList;
});
exports.default = convertCourseList;
