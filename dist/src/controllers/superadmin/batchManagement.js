"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const findBatch_1 = tslib_1.__importDefault(require("../../services/adminServices/findBatch"));
const updateBatchEndDate_1 = tslib_1.__importDefault(require("../../services/adminServices/updateBatchEndDate"));
const updateBatchStartDate_1 = tslib_1.__importDefault(require("../../services/adminServices/updateBatchStartDate"));
const batchmanagement = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
