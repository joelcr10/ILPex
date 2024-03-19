"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getUserByUserIdServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/BatchCreation/getUserByUserIdServices"));
const superAdminPrivilegesServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/BatchCreation/superAdminPrivilegesServices"));
const createBatchFromExcelServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/BatchCreation/createBatchFromExcelServices"));
const validateDateServices_1 = tslib_1.__importDefault(require("../../services/l_and_d_services/BatchCreation/validateDateServices"));
const createBatchController = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, batch_name, start_date, end_date } = req.body;
        const file = req.file;
        //To check if all th necessary inputs are available for making the API Call
        if (!user_id || !batch_name || !start_date || !end_date) {
            return res.status(404).json({ message: 'Missing Fields! Try Again!' });
        }
        //Date validation
        const dateStatus = (0, validateDateServices_1.default)(start_date, end_date);
        if (!dateStatus)
            return res.status(400).json({ error: "End date cannot be before Start date" });
        //Find the User who is making the API Call
        const findUser = yield (0, getUserByUserIdServices_1.default)(user_id);
        if (findUser && file) {
            const findUserWithCorrespondingRoleId = yield (0, superAdminPrivilegesServices_1.default)(findUser.role_id);
            if (findUserWithCorrespondingRoleId) {
                //Check if the person is either a Super Admin or a Learning And Development Team Member
                if (findUserWithCorrespondingRoleId.role_name === 'Super Admin' || findUserWithCorrespondingRoleId.role_name === 'Learning And Development') {
                    //Function to Create Batch
                    const batchCreation = yield (0, createBatchFromExcelServices_1.default)(req, res, file.path, batch_name, user_id, start_date, end_date);
                    if (batchCreation.message)
                        return res.status(batchCreation.status).json({ message: batchCreation.message });
                    else if (batchCreation.error) {
                        console.log("Already Exist In the Database");
                        return res.status(batchCreation.status).json({ error: batchCreation.error });
                    }
                    else
                        return res.status(500).json({ error: "Internal Server Error " });
                }
                else {
                    return res.status(401).json({ message: "This user does not have the permission to create a batch" });
                }
            }
            else {
                return res.status(401).json({ message: "This is not a Super Admin" });
            }
        }
        else {
            return res.status(404).json({ error: "Such a user doesn't exist!" });
        }
    }
    catch (err) {
        return res.status(520).json({ error: "Unknown Error Occured : " + err });
    }
});
exports.default = createBatchController;
