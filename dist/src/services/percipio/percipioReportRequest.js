"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const percipioReportRequest = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/learning-activity';
    const bearerToken = process.env.PERCIPIO_TOKEN;
    const reqBody = {
        "start": "2024-03-01T10:10:24Z",
        "end": "2024-04-18T10:20:24Z",
        "audience": "ALL",
        "contentType": "Course,Linked Content,Scheduled Content,Assessment",
        "csvPreferences": {
            "header": true,
            "rowDelimiter": "\\n",
            "columnDelimiter": ",",
            "headerForNoRecords": false
        },
        "sort": {
            "field": "lastAccessDate",
            "order": "desc"
        },
        "isFileRequiredInSftp": false,
        "formatType": "JSON"
    };
    try {
        const response = yield axios_1.default.post(apiUrl, reqBody, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json', // Adjust the content type based on your API requirements
            },
        });
        return response.data.id;
    }
    catch (error) {
        return null;
    }
});
exports.default = percipioReportRequest;
