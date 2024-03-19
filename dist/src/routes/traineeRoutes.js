"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const getAssessments_1 = tslib_1.__importDefault(require("../controllers/trainee/getAssessments"));
const getDaywiseCourseController_1 = tslib_1.__importDefault(require("../controllers/trainee/getDaywiseCourseController"));
const getQuestionsForAssessment_1 = tslib_1.__importDefault(require("../controllers/trainee/getQuestionsForAssessment"));
const updateScore_1 = tslib_1.__importDefault(require("../controllers/trainee/updateScore"));
const getPercipioData_1 = tslib_1.__importDefault(require("../controllers/trainee/getPercipioData"));
const daywiseTracking_1 = tslib_1.__importDefault(require("../controllers/trainee/daywiseTracking"));
const getProfileController_1 = tslib_1.__importDefault(require("../controllers/trainee/getProfileController"));
const dayCardController_1 = tslib_1.__importDefault(require("../controllers/trainee/dayCardController"));
const findCurrentDayController_1 = tslib_1.__importDefault(require("../controllers/l_and_d/findCurrentDayController"));
const verifyLoginJWT_1 = tslib_1.__importDefault(require("../middlewares/verifyLoginJWT"));
const percipioAssessmentController_1 = tslib_1.__importDefault(require("../controllers/trainee/percipioAssessmentController"));
const getTraineeDurationController_1 = tslib_1.__importDefault(require("../controllers/trainee/getTraineeDurationController"));
const router = (0, express_1.Router)();
router.get("/:id/assessment", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, getAssessments_1.default)(req, res);
}));
router.get("/course/day/:id", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, getDaywiseCourseController_1.default)(req, res);
}));
router.get("/assessment/:id", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, getQuestionsForAssessment_1.default)(req, res);
}));
router.post("/assessment", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, updateScore_1.default)(req, res);
}));
router.post("/percipio", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, getPercipioData_1.default)(req, res);
}));
router.get("/trainee/:trainee_id/course/day/:day_number", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, daywiseTracking_1.default)(req, res);
}));
router.get("/profile/:user_id", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, getProfileController_1.default)(req, res);
}));
router.get("/trainee/:trainee_id/days", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, dayCardController_1.default)(req, res);
}));
router.get('/batch/:batch_id/day/:current_date', verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, findCurrentDayController_1.default)(req, res);
}));
router.post("/percipio/assessment", verifyLoginJWT_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, percipioAssessmentController_1.default)(req, res);
}));
router.get("/trainee/:user_id/duration", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, getTraineeDurationController_1.default)(req, res);
}));
exports.default = router;
