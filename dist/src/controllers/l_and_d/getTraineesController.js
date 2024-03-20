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
const getAllTraineesServices_1 = __importDefault(require("../../services/l_and_d_Services/getAllTraineesServices"));
const getTrainees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
