"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const XLSX = __importStar(require("xlsx"));
const getUserByRoleNameServices_1 = __importDefault(require("./getUserByRoleNameServices"));
const createUserServices_1 = __importDefault(require("./createUserServices"));
const findBatchByBatchNameServices_1 = __importDefault(require("./findBatchByBatchNameServices"));
const createTraineeServices_1 = __importDefault(require("./createTraineeServices"));
const createBatchServices_1 = __importDefault(require("./createBatchServices"));
const createBatchFromExcelServices = (req, res, inputPath, batch_name, userID, start_date, end_date) => __awaiter(void 0, void 0, void 0, function* () {
    // Read the Excel file located at the specified input path
    const batchWorkbook = XLSX.readFile(inputPath);
    // Extract the name of the first sheet in the workbook
    const batchSheetName = batchWorkbook.SheetNames[0];
    // Retrieve the data of the first sheet from the workbook
    const batchSheet = batchWorkbook.Sheets[batchSheetName];
    // Convert the sheet data into JSON format
    const jsonBatchData = XLSX.utils.sheet_to_json(batchSheet);
    console.log(jsonBatchData);
    //For each json data (Each row containing each Trainee's details)
    for (const row of jsonBatchData) {
        const { Name, Role, Email, Percipio_Email, Password } = row;
        console.log(Name);
        //To check if the role specified in the Excel sheet is Trainee. If yes, find the corresponding role's role id.
        let roleId;
        const findRole = yield (0, getUserByRoleNameServices_1.default)(Role);
        if (findRole) {
            roleId = findRole.role_id;
        }
        else {
            return {
                status: 404,
                error: 'Invalid Role!'
            };
        }
        //To check if a batch with the specified name already exists!
        const findBatch = yield (0, findBatchByBatchNameServices_1.default)(batch_name);
        console.log("FindBatch = ", findBatch);
        if (findBatch) {
            const userCreation = yield (0, createUserServices_1.default)(Name, Role, Email, Percipio_Email, Password, roleId);
            if (!userCreation) {
                console.log("Already Exist");
                return {
                    status: 404,
                    error: 'User already exists in the Database!'
                };
            }
            let newUser_id = userCreation.user_id;
            if (newUser_id && findBatch.batch_id) {
                const traineeCreation = yield (0, createTraineeServices_1.default)(newUser_id, findBatch.batch_id, userID);
                console.log('Trainee has been added To an Already Existing Batch');
            }
            else {
                return {
                    status: 400,
                    error: 'Could not create Trainee because of Invalid data'
                };
            }
        }
        else {
            //Doesnt find any existing batch with the same name and hence creating a new batch.
            //UserID specifies the ID of the employee who has mae the API request and is trying to create the batch
            const batchCreation = yield (0, createBatchServices_1.default)(batch_name, start_date, end_date, userID);
            if (batchCreation) {
                const userCreation = yield (0, createUserServices_1.default)(Name, Role, Email, Percipio_Email, Password, roleId);
                if (!userCreation) {
                    return {
                        status: 404,
                        error: 'User already Exist in the Database. Aborting Batch Creation.'
                    };
                }
                let newUser_id = userCreation.user_id;
                if (newUser_id && batchCreation.batch_id) {
                    const traineeCreation = yield (0, createTraineeServices_1.default)(newUser_id, batchCreation.batch_id, userID);
                    console.log('Batch and Trainee has been created successfully!');
                }
                else {
                    return {
                        status: 400,
                        error: 'Could not create Trainee because of Invalid data'
                    };
                }
            }
            else {
                return {
                    status: 400,
                    error: 'Could not create Batch because of invalid data'
                };
            }
        }
    }
    return {
        status: 200,
        message: 'Batch has been Created successfully'
    };
});
exports.default = createBatchFromExcelServices;
