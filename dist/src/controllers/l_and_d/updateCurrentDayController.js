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
const individualTraineeProgress_1 = __importDefault(require("../../services/TraineeServices/individualTraineeProgress"));
const updateTraineeCurrentDayService_1 = __importDefault(require("../../services/TraineeServices/updateTraineeCurrentDayService"));
const getAllBatchesServices_1 = __importDefault(require("../../services/l_and_d_Services/getAllBatchesServices"));
const traineesByBatchIdServices_1 = __importDefault(require("../../services/l_and_d_Services/traineesByBatchIdServices"));
const updateCurrentDayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const batches = yield (0, getAllBatchesServices_1.default)(); //get all the batches
    yield Promise.all(batches.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const traineeList = yield (0, traineesByBatchIdServices_1.default)(item.batch_id); //get all the trainee from each batch
        yield Promise.all(traineeList.map((trainee) => __awaiter(void 0, void 0, void 0, function* () {
            const traineeCurrentDay = yield getTheCurrentDay(trainee.trainee_id); //update the current day for each trainee
            if (traineeCurrentDay == true) {
                console.log("updated the current day of", trainee.trainee_id);
            }
        })));
    })));
    return res.status(200).json({ data: "update current day" });
});
const getTheCurrentDay = (trainee_id) => __awaiter(void 0, void 0, void 0, function* () {
    const traineeProgress = yield (0, individualTraineeProgress_1.default)(trainee_id);
    if (traineeProgress == null) {
        return false;
    }
    else if (traineeProgress.length === 0) {
        return false;
    }
    // const dayCard = await calculateTraineeProgress(trainee_id);
    let currentDay = 0;
    let unlocked = true;
    // for(let i=1;i<=22;i++){
    //     currentDay = i;
    //     const currentDayCourses : any = await getDaywiseCourseServices(currentDay);
    //     let status : boolean = false;
    //     let dayProgress: number = 0;
    //     if(unlocked){
    //         const currentDayProgress = await getDayTraineeProgress(trainee_id,currentDay);
    //         if(currentDayCourses.length===currentDayProgress.length){
    //             dayProgress = 100;
    //             status = true;
    //         }else if(currentDayCourses.length<=currentDayProgress.length){
    //             dayProgress = 100;
    //             status = true;
    //         }
    //         else{
    //             //update the trainee current day here
    //             await updateTraineeCurrentDayService(trainee_id,i);
    //             dayProgress = (currentDayProgress.length/currentDayCourses.length) * 100;
    //             status = true;
    //             unlocked = false;
    //         }
    //     }
    //     if(i===15){
    //         i++;
    //     }
    // }
    if (unlocked) {
        yield (0, updateTraineeCurrentDayService_1.default)(trainee_id, 22);
    }
    return true;
});
exports.default = updateCurrentDayController;
