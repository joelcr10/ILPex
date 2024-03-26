import * as XLSX from 'xlsx';

export interface ExcelRow {
    Question_Text: string;
    Option_A : string;
    Option_B: string;
    Option_C : string;
    Option_D : string;
    Correct_Answer : string
};

const convertToJsonService = async(inputFilePath:string)=>{
    console.log("JsonBatchDate");
        const assessmentWorkBook = XLSX.readFile(inputFilePath);
        const assessmentSheetName = assessmentWorkBook.SheetNames[0];
        const assessmentSheet = assessmentWorkBook.Sheets[assessmentSheetName];
        
        const jsonBatchData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(assessmentSheet);
        return jsonBatchData;
}

export default convertToJsonService;