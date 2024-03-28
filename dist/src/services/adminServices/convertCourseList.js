"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = __importStar(require("xlsx"));
const convertCourseList = (inputPath) => __awaiter(void 0, void 0, void 0, function* () {
    const courseList = [];
    try {
        //converting Excel to json object
        const courseWorkBook = XLSX.readFile(inputPath);
        const courseSheetName = courseWorkBook.SheetNames[0];
        console.log("Name ---------->", courseSheetName),
            console.log("Array----------->", courseWorkBook.SheetNames);
        const courseSheet = courseWorkBook.Sheets[courseSheetName]; //getting the details of one sheet of excel
        const jsonBatchData = XLSX.utils.sheet_to_json(courseSheet);
        console.log("Data---------->", jsonBatchData);
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
                console.log("Duration--------> ", course_duration);
                if (course_duration === undefined || course_duration.length === 1 || typeof course_duration == "number") { //for some courses the course_duration is empty in excel
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
        console.log("Error---------->", error);
        return null;
    }
    return courseList;
});
exports.default = convertCourseList;
