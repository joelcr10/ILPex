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
const uploadQuestionsService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/uploadQuestionsService"));
const convertToJsonService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/convertToJsonService"));
const uploadAssessmentService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/uploadAssessmentService"));
const findRoleService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/findRoleService"));
const findUserService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/findUserService"));
const findBatchService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/findBatchService"));
const uploadAssignmentToBatch_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/uploadAssignmentToBatch"));
const findAssessmentService_1 = __importDefault(require("../../services/l_and_d_Services/create_assessment/findAssessmentService"));
const createAssessmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting required data from request body
        const { user_id, assessment_name, numberOfAttempts, batch_id, start_date, end_date, } = req.body;
        const file = req.file;
        // Checking if all required fields are provided
        if (!user_id ||
            !assessment_name ||
            !batch_id ||
            !start_date ||
            !end_date ||
            !numberOfAttempts ||
            !file) {
            return res
                .status(401)
                .json({
                error: "Please ensure that the user_id,assessment_name,batch_id,start_date, numberOfAttempts and end-date is provided",
            });
        }
        else {
            const number_of_attempts = Number(numberOfAttempts);
            // Converting uploaded file to JSON
            const jsonQuestionsData = (0, convertToJsonService_1.default)(file.path);
            // Finding user and batch
            const user = yield (0, findUserService_1.default)(user_id);
            console.log(user);
            const batch = yield (0, findBatchService_1.default)(batch_id);
            console.log(batch);
            // Checking if user and batch exist and batch is active
            if (!user || !batch || !batch.isActive === true) {
                return res
                    .status(404)
                    .json({
                    error: "No such user or no such batch is found or currently the batch is inactive",
                });
            }
            // validating user's role
            const role_found = yield (0, findRoleService_1.default)(user);
            console.log(role_found);
            if ((role_found && role_found.role_name === "Learning And Development") ||
                "Super Admin") {
                // Checking if assessment with the same name already exists
                const assessment_found = yield (0, findAssessmentService_1.default)(assessment_name);
                if (assessment_found) {
                    return res
                        .status(404)
                        .json({ error: "A similar assessment has already been created." });
                }
                else {
                    // Validating assessment start and end dates against batch start and end dates
                    const batch_start_date = new Date(batch.start_date);
                    console.log(batch_start_date);
                    const batch_end_date = new Date(batch.end_date);
                    const assessment_start_date = new Date(start_date);
                    console.log("it is", assessment_start_date);
                    const assessment_end_date = new Date(end_date);
                    if (assessment_start_date < assessment_end_date) {
                        if (batch_start_date < assessment_start_date &&
                            assessment_end_date < batch_end_date) {
                            // Uploading assessment and questions
                            const assessment = yield (0, uploadAssessmentService_1.default)(assessment_name, user);
                            if (!assessment) {
                                return res
                                    .status(500)
                                    .json({ error: "Assessment creation failed" });
                            }
                            else {
                                const assessment_to_batch = yield (0, uploadAssignmentToBatch_1.default)(assessment, batch_id, user_id, start_date, end_date, number_of_attempts);
                                yield (0, uploadQuestionsService_1.default)(yield jsonQuestionsData, assessment, user_id);
                                return res
                                    .status(201)
                                    .json({ message: "Assessment uploaded successfully" });
                            }
                        }
                        else {
                            return res
                                .status(400)
                                .json({
                                error: "The due date specified is not in the range of the batch start and end dates",
                            });
                        }
                    }
                    else {
                        return res
                            .status(400)
                            .json({ error: "Please ensure that the dates are valid" });
                    }
                }
            }
            else {
                return res
                    .status(401)
                    .json({
                    error: "The user does not belong to Learning and Development",
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
});
exports.default = createAssessmentController;
