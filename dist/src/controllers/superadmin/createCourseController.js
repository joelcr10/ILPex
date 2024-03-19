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
const createCourseServices_1 = __importDefault(require("../../services/adminServices/createCourseServices"));
const convertCourseList_1 = __importDefault(require("../../services/adminServices/convertCourseList"));
const getAllCourses_1 = __importDefault(require("../../services/adminServices/getAllCourses"));
const createCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { createdBy } = req.body;
        const file = req.file;
        if (!createdBy) {
            return res.status(404).json({ message: "invalid createdBY" });
        }
        const existingCourses = yield (0, getAllCourses_1.default)();
        if (existingCourses.length > 0) {
            return res.status(404).json({ message: existingCourses });
        }
        if (file) {
            const courseList = yield (0, convertCourseList_1.default)(file.path); //converts the Excel data to array of Course details objects
            if (courseList == null) {
                return res.status(422).json({ message: "Error Parsing The excel file" });
            }
            const newCourse = yield (0, createCourseServices_1.default)(courseList); //bulk creates the courses to the DB
            if (newCourse == null) {
                return res.status(500).json({ message: "couldn't create table" });
            }
            return res.status(200).json({ message: 'created new course' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.default = createCourseController;
