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
const getCoursesByCourseSetIdServices_1 = __importDefault(require("../../services/adminServices/getCoursesByCourseSetIdServices"));
const getCourseCollectionOfABatchByBatchIDServices_1 = __importDefault(require("./getCourseCollectionOfABatchByBatchIDServices"));
const getCourseCollectionNameByCourseSetIdServices_1 = __importDefault(require("./getCourseCollectionNameByCourseSetIdServices"));
const getAllCourseCollectionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch_id = parseInt(req.params.batch_id);
        const courseCollection = yield (0, getCourseCollectionOfABatchByBatchIDServices_1.default)(batch_id);
        const courseCollectionName = yield (0, getCourseCollectionNameByCourseSetIdServices_1.default)(courseCollection.course_set_id);
        const course_set_id = courseCollection.course_set_id;
        const course_list = yield (0, getCoursesByCourseSetIdServices_1.default)(course_set_id);
        const courseSetObject = {
            course_set_id: course_set_id,
            course_set_name: courseCollectionName.course_set_name,
            number_of_days: course_list.numberOfDays,
            number_of_courses: course_list.numberOfCourses,
            course_list: course_list.courseSetNames
        };
        return res.status(200).json({ course_data: courseSetObject });
    }
    catch (error) {
        return res.status(404).json({ error: 'Error while fetching course names' });
    }
});
exports.default = getAllCourseCollectionController;
