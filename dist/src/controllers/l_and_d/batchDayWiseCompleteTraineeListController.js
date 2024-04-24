"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const traineesByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const findCoursesInADayByCurrentDayServices_1 = __importDefault(require("../../services/l_and_d_Services/findCoursesInADayByCurrentDayServices"));
const findCourseProgressInAParticularDayServices_1 = __importDefault(require("../../services/l_and_d_Services/findCourseProgressInAParticularDayServices"));
const findTraineeNameByTraineeIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findTraineeNameByTraineeIdServices"));
const batchDetailsServices_1 = __importDefault(require("../../services/l_and_d_Services/batchDetailsServices"));
const findUserIdByTraineeIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findUserIdByTraineeIdServices"));
const getCourseSetIdByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/getCourseSetIdByBatchIdServices"));
const batchDayWiseCompleteTraineeListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let incompleteTraineesList = [];
    try {
        let batch_id = parseInt(req.params.batch_id);
        let day_id = parseInt(req.params.day_id);
        const courseSetId = yield (0, getCourseSetIdByBatchIdServices_1.default)(Number(batch_id));
        const findTrainees = yield (0, traineesByBatchIdServices_1.default)(batch_id);
        const findCoursesInADayList = yield (0, findCoursesInADayByCurrentDayServices_1.default)(day_id, courseSetId);
        const batchName = yield (0, batchDetailsServices_1.default)(batch_id);
        const courseCount = findCoursesInADayList.length;
        if (findTrainees && batchName) {
            for (const trainee of findTrainees) {
                if (trainee.trainee_id) {
                    const userId = yield (0, findUserIdByTraineeIdServices_1.default)(trainee.trainee_id);
                    const remainingCourses = [];
                    let coursesLeftCount = 0;
                    console.log("Trainee ID --------> ", trainee.trainee_id);
                    const traineeDetails = yield (0, findTraineeNameByTraineeIdServices_1.default)(trainee.trainee_id);
                    const traineeName = traineeDetails.user_name;
                    const traineeEmail = traineeDetails.email;
                    const findTraineeProgress = yield (0, findCourseProgressInAParticularDayServices_1.default)(trainee.trainee_id, day_id);
                    const traineeCourseCount = findTraineeProgress.length;
                    console.log("Trainee Name --------- ", traineeName);
                    console.log("Trainee Course Count ---------", traineeCourseCount);
                    console.log("Course Count ----------", courseCount);
                    if (traineeCourseCount < courseCount)
                        continue;
                    else {
                        // const courseIdsInDayList = findCoursesInADayList.map(
                        //   (course) => course.dataValues.course_id
                        // );
                        // const courseIdsInProgress = findTraineeProgress.map(
                        //   (progress) => progress.dataValues.course_id
                        // );
                        // for (const courseId of courseIdsInDayList) {
                        //   const course = findCoursesInADayList.find(
                        //     (course) => course.dataValues.course_id === courseId
                        //   );
                        //   if (!courseIdsInProgress.includes(courseId) && course) {
                        //     coursesLeftCount = coursesLeftCount + 1;
                        //     remainingCourses.push(course.dataValues.course_name);
                        //   }
                        //   console.log("Remaining Courses---------->", remainingCourses);
                        // }
                        const traineeObject = {
                            user_id: userId,
                            trainee_id: trainee.trainee_id,
                            batch_id: batch_id,
                            user_name: traineeName,
                            email: traineeEmail,
                        };
                        incompleteTraineesList.push(traineeObject);
                    }
                }
                else {
                    return res.status(404).json({ error: "Invalid Trainee ID" });
                }
            }
            return res
                .status(200)
                .json({ IncompleteTraineeList: incompleteTraineesList });
        }
        else {
            return res.status(404).json({ error: "No trainees exist in this batch" });
        }
    }
    catch (error) {
        return res.status(520).json({ error: "Unknown Error Occured : " + error });
    }
});
exports.default = batchDayWiseCompleteTraineeListController;
