"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const batches_1 = tslib_1.__importDefault(require("../../models/batches"));
const getBatchDetails = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batch_id } = req.body;
        if (!batch_id) {
            return res.status(400).json({ message: "batch_id not defined" });
        }
        const batch_details = yield batches_1.default.findAll({ where: { batch_id: batch_id } });
        if (batch_details == null) {
            return res.status(404).json({ message: "invalid batch_id" });
        }
        return res.status(200).json(batch_details);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// {batch_name:string,start_date:Date,end_date:Date,current_day:Date,isActive:boolean}
exports.default = getBatchDetails;
