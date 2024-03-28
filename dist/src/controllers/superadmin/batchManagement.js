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
const findBatch_1 = __importDefault(require("../../services/adminServices/findBatch"));
const updateBatchEndDate_1 = __importDefault(require("../../services/adminServices/updateBatchEndDate"));
const updateBatchStartDate_1 = __importDefault(require("../../services/adminServices/updateBatchStartDate"));
const updateBatchName_1 = __importDefault(require("../../services/adminServices/updateBatchName"));
const batchmanagement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batchId, endDate, startDate, BatchName } = req.body;
        if (!batchId) {
            return res.status(200).json('No batch id provided');
        }
        else if (!endDate && !startDate && !BatchName) {
            return res.status(200).json('No Start date or End date is given or batch name');
        }
        else {
            const batch = yield (0, findBatch_1.default)(batchId); //Servie to find batch details.
            if (batch === null) {
                return res.status(200).json('No Batch found');
            }
            else {
                const oldDate = new Date(batch.start_date);
                if (endDate) {
                    yield (0, updateBatchEndDate_1.default)(batch, endDate); //Service to update end date.
                    return res.status(200).json('End Date Updated');
                }
                else if (startDate) {
                    const newDate = yield (0, updateBatchStartDate_1.default)(batch, startDate); //Service to update start date
                    const newStartDate = new Date(newDate.start_date);
                    const batch_end_date = new Date(newDate.end_date);
                    const updated = Math.abs(newStartDate - oldDate);
                    const newEndDate = new Date(batch_end_date.getTime() + updated);
                    const dateTimeString = newEndDate.toISOString();
                    yield (0, updateBatchEndDate_1.default)(newDate, dateTimeString.split("T")[0]);
                    return res.status(200).json({ message: 'Start Date Updated' });
                }
                else if (BatchName) {
                    yield (0, updateBatchName_1.default)(batch, BatchName); //Service to update batch name
                    return res.status(200).json({ message: 'Batch Name Updated' });
                }
            }
        }
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = batchmanagement;
