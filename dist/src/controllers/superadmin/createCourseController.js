"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const createCourseServices_1 = tslib_1.__importDefault(require("../../services/adminServices/createCourseServices"));
const convertCourseList_1 = tslib_1.__importDefault(require("../../services/adminServices/convertCourseList"));
const getAllCourses_1 = tslib_1.__importDefault(require("../../services/adminServices/getAllCourses"));
const createCourseController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
