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
const getAllBatchesServices_1 = __importDefault(require("../../services/l_and_d_Services/getAllBatchesServices"));
const getAllBatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
