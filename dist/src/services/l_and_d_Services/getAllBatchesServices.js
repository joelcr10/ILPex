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
const getCourseCollectionOfABatchByBatchIDServices_1 = __importDefault(require("../../controllers/l_and_d/getCourseCollectionOfABatchByBatchIDServices"));
const batches_1 = __importDefault(require("../../models/batches"));
const getCoursesByCourseSetIdServices_1 = __importDefault(require("../adminServices/getCoursesByCourseSetIdServices"));
const getTraineesCount_1 = __importDefault(require("./getTraineesCount"));
const traineeNamesByBatchIdServices_1 = __importDefault(require("./traineeNamesByBatchIdServices"));
const calculateProgress = (start, end) => {
    const currentDate = new Date();
    if (currentDate < start) {
        return 0;
    }
    if (currentDate > end) {
        return 100;
    }
    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = currentDate.getTime() - start.getTime();
    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(progressPercentage, 100);
};
const getAllBatch = () => __awaiter(void 0, void 0, void 0, function* () {
    const batch_details = yield batches_1.default.findAll({
        attributes: ['batch_id', 'batch_name', 'start_date', 'end_date', 'isActive'],
    });
    const batchDetailsWithProgress = yield Promise.all(batch_details.map((batch) => __awaiter(void 0, void 0, void 0, function* () {
        const { batch_id, batch_name, start_date, end_date, isActive } = batch;
        const progress = calculateProgress(new Date(start_date), new Date(end_date));
        const noOfTrainees = yield (0, getTraineesCount_1.default)(batch_id);
        const batchCourseSet = yield (0, getCourseCollectionOfABatchByBatchIDServices_1.default)(batch_id);
        const courseList = yield (0, getCoursesByCourseSetIdServices_1.default)(batchCourseSet.course_set_id);
        const traineesList = yield (0, traineeNamesByBatchIdServices_1.default)(batch_id);
        return {
            batch_id,
            batch_name,
            start_date,
            end_date,
            isActive,
            progress,
            noOfTrainees,
            courseList,
            traineesList
        };
    })));
    return batchDetailsWithProgress;
});
exports.default = getAllBatch;
