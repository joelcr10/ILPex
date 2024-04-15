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
const percipioReportRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    console.log("current date---->", currentDate);
    const apiUrl = "https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/learning-activity";
    const bearerToken = process.env.PERCIPIO_TOKEN;
    const reqBody = {
        start: "2024-03-04T00:00:00Z",
        end: "2024-04-02T23:59:59Z",
        audience: "ALL",
        contentType: "Course,Linked Content,Scheduled Content,Assessment",
        csvPreferences: {
            header: true,
            rowDelimiter: "\\n",
            columnDelimiter: ",",
            headerForNoRecords: false,
        },
        sort: {
            field: "lastAccessDate",
            order: "desc",
        },
        isFileRequiredInSftp: false,
        formatType: "JSON",
    };
    try {
        const response = yield axios_1.default.post(apiUrl, reqBody, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json", // Adjust the content type based on your API requirements
            },
        });
        return response.data.id;
    }
    catch (error) {
        return null;
    }
});
exports.default = percipioReportRequest;
