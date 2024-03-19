"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const XLSX = tslib_1.__importStar(require("xlsx"));
const getUserByRoleNameServices_1 = tslib_1.__importDefault(require("./getUserByRoleNameServices"));
const createUserServices_1 = tslib_1.__importDefault(require("./createUserServices"));
const findBatchByBatchNameServices_1 = tslib_1.__importDefault(require("./findBatchByBatchNameServices"));
const createTraineeServices_1 = tslib_1.__importDefault(require("./createTraineeServices"));
const createBatchServices_1 = tslib_1.__importDefault(require("./createBatchServices"));
const createBatchFromExcelServices = (req, res, inputPath, batch_name, userID, start_date, end_date) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
