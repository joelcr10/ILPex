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
const batches_1 = __importDefault(require("../../models/batches"));
const getBatchDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
