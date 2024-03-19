"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getAllTraineesServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/getAllTraineesServices"));
const getTrainees = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        //query parameters
        const offset = parseInt(req.query.offset) || 0;
        const sortKey = req.query.sortKey || "trainee_id";
        const sortOrder = req.query.sortOrder === '-1' ? 'DESC' : 'ASC';
        const batch_id = parseInt(req.query.batch_id) || 0;
        if (sortKey !== 'trainee_id' && sortKey !== 'user_id' && sortKey !== 'batch_id') {
            return res.status(400).json({ message: "Invalid SortKey" });
        }
        //Call the service function to get trainee data
        const trainees = yield (0, getAllTraineesServices_1.default)(offset, sortKey, sortOrder, batch_id);
        if (trainees == null) {
            return res.json({ message: "No Results Found" });
        }
        return res.status(200).json(trainees);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getTrainees;
