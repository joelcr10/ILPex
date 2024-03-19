"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getAllBatchesServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/getAllBatchesServices"));
const getAllBatches = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const batches = yield (0, getAllBatchesServices_1.default)();
        if (!batches) {
            res.status(404).json({ message: "No Batch Found" });
        }
        return res.status(200).json({ batches });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getAllBatches;
