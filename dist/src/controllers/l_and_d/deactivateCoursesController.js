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
const findBatchesAssignedToACourseByCourseSetIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findBatchesAssignedToACourseByCourseSetIdServices"));
const findEndDateOfTheBatchByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/findEndDateOfTheBatchByBatchIdServices"));
const deactivateCoursesInTheListServices_1 = __importDefault(require("../../services/deactivateCoursesInTheListServices"));
const deactivateCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { course_set_id } = req.body;
        console.log("Course Set ID --------", req.body);
        if (!course_set_id)
            return res.status(405).json({ error: "Course Set ID is missing!" });
        const batchesAssignedToThisCourse = yield (0, findBatchesAssignedToACourseByCourseSetIdServices_1.default)(course_set_id);
        if (batchesAssignedToThisCourse) {
            for (const obj of batchesAssignedToThisCourse) {
                const endDateOfTheBatch = yield (0, findEndDateOfTheBatchByBatchIdServices_1.default)(obj.batch_id);
                if (endDateOfTheBatch) {
                    const current_date = new Date();
                    if (endDateOfTheBatch >= current_date)
                        return res
                            .status(402)
                            .json({
                            error: "Cannot delete this course since it is already assigned to an Active Batch.",
                        });
                }
                console.log("Hi-------");
            }
        }
        console.log("Hi-------");
        const deactivateCoursesStatus = yield (0, deactivateCoursesInTheListServices_1.default)(course_set_id);
        if (deactivateCoursesStatus)
            return res
                .status(200)
                .json({
                message: "The Course Collection has been removed Successfully",
            });
        else
            return res
                .status(404)
                .json({ error: "Error while deleting the Course list!" });
    }
    catch (error) {
        return res
            .status(404)
            .json({ error: "Error while deleting the course list" });
    }
});
exports.default = deactivateCourseController;
