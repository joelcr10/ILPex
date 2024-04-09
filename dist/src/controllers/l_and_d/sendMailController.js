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
const sendMail_1 = __importDefault(require("../../services/l_and_d_Services/sendMail"));
const sendMailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { day_number, IncompleteTraineeList } = req.body;
    console.log("Inside send mail", IncompleteTraineeList);
    if (!IncompleteTraineeList) {
        return res.status(400).json({ message: "Incomplete trainee list missing" });
    }
    if (!day_number) {
        return res.status(400).json({ message: "Day number is missing" });
    }
    if (IncompleteTraineeList.length === 0) {
        return res.status(400).json({ message: "Trainee list is empty" });
    }
    try {
        console.log("Sending mails...");
        for (const item of IncompleteTraineeList) {
            yield (0, sendMail_1.default)(item.email, item.user_name, day_number);
        }
        console.log("All mails sent successfully");
        return res.status(200).json({ message: "Successfully sent mail" });
    }
    catch (error) {
        console.error("Error sending mails:", error);
        return res.status(500).json({ error: "Failed to send mail" });
    }
});
exports.default = sendMailController;
