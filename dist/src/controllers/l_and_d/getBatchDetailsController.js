"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batchDetailsServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/batchDetailsServices"));
const getTraineesCount_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/getTraineesCount"));
const getBatchDetails = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch_id = parseInt(req.params.batch_id);
        if (!batch_id) {
            return res.status(400).json({ message: "batch_id not defined" });
        }
        ////Call the service function to get batches details
        const batch_details = yield (0, batchDetailsServices_1.default)(batch_id);
        const noOfTrainees = yield (0, getTraineesCount_1.default)(batch_id);
        if (noOfTrainees == 0) {
            return res.status(404).json({ message: "No Trainees Found in the Specified Batch" });
        }
        if (batch_details == null) {
            return res.status(404).json({ message: "Batch Not Found" });
        }
        return res.status(200).json({ batch_details, noOfTrainees });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getBatchDetails;
