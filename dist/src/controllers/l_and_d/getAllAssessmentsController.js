"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getAllAssessmentServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/getAllAssessmentServices"));
const getAllAsssessment = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        //query parameters
        const offset = parseInt(req.query.offset) || 0;
        const sortKey = req.query.sortKey || "assessment_name";
        const sortOrder = req.query.sortOrder === '-1' ? 'DESC' : 'ASC';
        if (sortKey !== "assessment_name") {
            return res.status(400).json({ message: "Invalid SortKey" });
        }
        //Call the service function to assessment data 
        const assessments = yield (0, getAllAssessmentServices_1.default)(offset, sortKey, sortOrder);
        console.log(assessments);
        if (assessments == null) {
            return res.status(404).json({ message: "No Result Found" });
        }
        return res.status(200).json({ assessments });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = getAllAsssessment;
