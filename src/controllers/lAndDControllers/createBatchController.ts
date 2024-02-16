import * as XLSX from 'xlsx';
import fs from 'fs';

function convertXlsxToCsv(inputFilePath: string = '../../../../../ProjectFileAccess/CreateBatchProject.xlsx') {
    const workbook = XLSX.readFile(inputFilePath);

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    console.log(typeof(sheet));
    const csvData = XLSX.utils.sheet_to_csv(sheet);

    console.log(csvData);
    console.log(typeof(csvData));
}

convertXlsxToCsv();