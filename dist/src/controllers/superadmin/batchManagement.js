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
const batchmanagement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batchId, endDate, startDate } = req.body;
        if (!batchId) {
            return res.status(200).json('No batch id provided');
        }
        else if (!endDate && !startDate) {
            return res.status(200).json('No Start date or End date is given');
        }
        else {
            const batch = yield (0, findBatch_1.default)(batchId); //Servie to find batch details.
            if (batch == null) {
                return res.status(200).json('No Batch found');
            }
            else {
                if (endDate) {
                    yield (0, updateBatchEndDate_1.default)(batch, endDate); //Service to update end date.
                    return res.status(200).json('End Date Updated');
                }
                else if (startDate) {
                    yield (0, updateBatchStartDate_1.default)(batch, startDate); //Service to update start date.
                    return res.status(200).json({ message: 'Start Date Updated' });
                }
            }
        }
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.default = batchmanagement;
