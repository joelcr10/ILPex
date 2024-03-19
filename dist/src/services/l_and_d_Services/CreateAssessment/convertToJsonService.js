"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const XLSX = tslib_1.__importStar(require("xlsx"));
;
const convertToJsonService = (inputFilePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("JsonBatchDate");
    const assessmentWorkBook = XLSX.readFile(inputFilePath);
    const assessmentSheetName = assessmentWorkBook.SheetNames[0];
    const assessmentSheet = assessmentWorkBook.Sheets[assessmentSheetName];
    const jsonBatchData = XLSX.utils.sheet_to_json(assessmentSheet);
    return jsonBatchData;
});
exports.default = convertToJsonService;
