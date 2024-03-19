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
const axios_1 = __importDefault(require("axios"));
const learningActivity = (reportRequestId) => __awaiter(void 0, void 0, void 0, function* () {
    const reportApi = `https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/${reportRequestId}`;
    try {
        const report = yield axios_1.default.get(reportApi, {
            headers: {
                'Authorization': `Bearer ${process.env.PERCIPIO_TOKEN}`,
                'Content-Type': 'application/json', // Adjust the content type based on your API requirements
            },
        });
        return report.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = learningActivity;
