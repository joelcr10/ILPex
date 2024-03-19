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
const getTraineeDetailsServices_1 = __importDefault(require("../../services/TraineeServices/getTraineeDetailsServices"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.params.user_id);
        if (!user_id) {
            return res.status(400).json({ message: 'user_id not valid' });
        }
        const data = yield (0, getTraineeDetailsServices_1.default)(user_id);
        if (data == null) {
            return res.status(404).json({ message: 'No User Found' });
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.default = getProfile;
