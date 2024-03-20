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
const batchDetailsServices_1 = __importDefault(require("../../services/l_and_d_Services/batchDetailsServices"));
const getTraineesCount_1 = __importDefault(require("../../services/l_and_d_Services/getTraineesCount"));
const getBatchDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
