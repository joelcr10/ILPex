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
const getCourseCollectionNamesServices_1 = __importDefault(require("../../services/adminServices/getCourseCollectionNamesServices"));
const getCoursesByCourseSetIdServices_1 = __importDefault(require("../../services/adminServices/getCoursesByCourseSetIdServices"));
const courseList = [];
const getAllCourseCollectionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseCollection = yield (0, getCourseCollectionNamesServices_1.default)();
        for (const courseCollectionObj of courseCollection) {
            const course_set_id = courseCollectionObj.course_set_id;
            const course_list = yield (0, getCoursesByCourseSetIdServices_1.default)(course_set_id);
            const courseSetObject = {
                course_set_name: courseCollectionObj.course_set_name,
                course_list: course_list
            };
            courseList.push(courseSetObject);
        }
        return res.status(200).json({ course_data: courseList });
    }
    catch (error) {
        return res.status(404).json({ error: 'Error while fetching course names' });
    }
});
exports.default = getAllCourseCollectionController;
