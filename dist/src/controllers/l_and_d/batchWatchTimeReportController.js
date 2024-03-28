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
const findbatchbybatchidservices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findbatchbybatchidservices"));
const findTraineesOfABatchServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findTraineesOfABatchServices"));
const getTraineePericpioData_1 = __importDefault(require("../../services/l_and_d_services/getTraineePericpioData"));
const findTraineeNameByUserIdServices_1 = __importDefault(require("../../services/l_and_d_services/findTraineeNameByUserIdServices"));
const findBatchNameByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_services/trainee_analysis/findBatchNameByBatchIdServices"));
const batchWatchTimeReportController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let twoTimesWatchSpeed = 0;
    let onePointFiveWatchSpeed = 0;
    let oneWatchSpeed = 0;
    let lessThanOneWatchSpeed = 0;
    let haveNotWatchedAnyVideo = 0;
    let twoTimesWatchSpeedTraineesList = [];
    let onePointFiveWatchSpeedTraineesList = [];
    let oneWatchSpeedTraineesList = [];
    let lessThanOneWatchSpeedTraineesList = [];
    let haveNotWatchedAnyVideoTraineesList = [];
    try {
        const batch_id = parseInt(req.params.batch_id);
        if (!batch_id)
            return res.status(401).json({ error: "Please ensure that the Batch ID is Provided" });
        const findBatchById = yield (0, findbatchbybatchidservices_1.default)(batch_id);
        if (findBatchById) {
            const traineesList = yield (0, findTraineesOfABatchServices_1.default)(batch_id);
            const batchName = yield (0, findBatchNameByBatchIdServices_1.default)(batch_id);
            if (traineesList && batchName) {
                for (const trainee of traineesList) {
                    const trainee_id = trainee.dataValues.trainee_id;
                    const user_id = trainee.dataValues.user_id;
                    const findTraineeName = yield (0, findTraineeNameByUserIdServices_1.default)(user_id);
                    if (findTraineeName) {
                        const traineeObject = {
                            user_id: findTraineeName.user_id,
                            trainee_id: trainee_id,
                            user_name: findTraineeName.user_name
                        };
                        const traineePercipioData = yield (0, getTraineePericpioData_1.default)(trainee_id);
                        if (traineePercipioData && findTraineeName) {
                            if (traineePercipioData.length != 0) {
                                let watchTime = 0;
                                let realCourseDuration = 0;
                                traineePercipioData.forEach((traineePercipioData) => __awaiter(void 0, void 0, void 0, function* () {
                                    watchTime = watchTime + traineePercipioData.dataValues.duration;
                                    realCourseDuration = realCourseDuration + traineePercipioData.dataValues.estimated_duration;
                                }));
                                const watchTimeRatio = (watchTime / realCourseDuration) * 100;
                                if (watchTimeRatio > 0 && watchTimeRatio <= 50) {
                                    twoTimesWatchSpeed = twoTimesWatchSpeed + 1;
                                    twoTimesWatchSpeedTraineesList.push(traineeObject);
                                }
                                else if (watchTimeRatio > 50 && watchTimeRatio <= 67) {
                                    onePointFiveWatchSpeed = onePointFiveWatchSpeed + 1;
                                    onePointFiveWatchSpeedTraineesList.push(traineeObject);
                                }
                                else if (watchTimeRatio > 67 && watchTimeRatio <= 100) {
                                    oneWatchSpeed = oneWatchSpeed + 1;
                                    oneWatchSpeedTraineesList.push(traineeObject);
                                }
                                else {
                                    lessThanOneWatchSpeed = lessThanOneWatchSpeed + 1;
                                    lessThanOneWatchSpeedTraineesList.push(traineeObject);
                                }
                            }
                            else {
                                haveNotWatchedAnyVideo = haveNotWatchedAnyVideo + 1;
                                haveNotWatchedAnyVideoTraineesList.push(traineeObject);
                            }
                        }
                    }
                }
                ;
                return res.status(200).json({
                    data: {
                        batch_name: batchName.batch_name,
                        twoTimesWatchSpeed: twoTimesWatchSpeed,
                        onePointFiveWatchSpeed: onePointFiveWatchSpeed,
                        oneWatchSpeed: oneWatchSpeed,
                        lessThanOneWatchSpeed: lessThanOneWatchSpeed,
                        haveNotWatchedAnyVideo: haveNotWatchedAnyVideo,
                        twoTimesWatchSpeedTraineesList: twoTimesWatchSpeedTraineesList,
                        onePointFiveWatchSpeedTraineesList: onePointFiveWatchSpeedTraineesList,
                        oneWatchSpeedTraineesList: oneWatchSpeedTraineesList,
                        lessThanOneWatchSpeedTraineesList: lessThanOneWatchSpeedTraineesList,
                        haveNotWatchedAnyVideoTraineesList: haveNotWatchedAnyVideoTraineesList
                    }
                });
            }
            else {
                return res.status(404).json({ error: "There are no trainees in this batch" });
            }
        }
        else {
            return res.status(404).json({ error: "Such A Batch Doesn't Exist" });
        }
    }
    catch (error) {
        return res.status(520).json({ error: "Unknown Error Occured : " + error });
    }
});
exports.default = batchWatchTimeReportController;
