"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const learningActivity = (reportRequestId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
