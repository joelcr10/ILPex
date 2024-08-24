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
const getUserByUserIdServices_1 = __importDefault(require("../../services/l_and_d_Services/batch_creation/getUserByUserIdServices"));
const superAdminPrivilegesServices_1 = __importDefault(require("../../services/l_and_d_Services/batch_creation/superAdminPrivilegesServices"));
const createBatchFromExcelServices_1 = __importDefault(require("../../services/l_and_d_Services/batch_creation/createBatchFromExcelServices"));
const validateDateServices_1 = __importDefault(require("../../services/l_and_d_Services/batch_creation/validateDateServices"));
const createBatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, batch_name, start_date, end_date, course_collection_name, include_saturdays, } = req.body;
        const file = req.file;
        //To check if all th necessary inputs are available for making the API Call
        if (!user_id ||
            !batch_name ||
            !start_date ||
            !end_date ||
            !course_collection_name ||
            !include_saturdays) {
            return res.status(404).json({ message: "Missing Fields! Try Again!" });
        }
        //Date validation
        const dateStatus = (0, validateDateServices_1.default)(start_date, end_date);
        if (!dateStatus)
            return res
                .status(400)
                .json({ error: "End date cannot be before Start date" });
        //Find the User who is making the API Call
        const findUser = yield (0, getUserByUserIdServices_1.default)(user_id);
        if (findUser && file) {
            const findUserWithCorrespondingRoleId = yield (0, superAdminPrivilegesServices_1.default)(findUser.role_id);
            if (findUserWithCorrespondingRoleId) {
                //Check if the person is either a Super Admin or a Learning And Development Team Member
                if (findUserWithCorrespondingRoleId.role_name === "Super Admin" ||
                    findUserWithCorrespondingRoleId.role_name ===
                        "Learning And Development") {
                    //Function to Create Batch
                    const batchCreation = yield (0, createBatchFromExcelServices_1.default)(req, res, file.path, batch_name, user_id, start_date, end_date, course_collection_name, include_saturdays);
                    if (batchCreation.message)
                        return res
                            .status(batchCreation.status)
                            .json({ message: batchCreation.message });
                    else if (batchCreation.error) {
                        console.log("Already Exist In the Database");
                        console.log(batchCreation.error);
                        return res
                            .status(batchCreation.status)
                            .json({ error: batchCreation.error });
                    }
                    else
                        return res.status(500).json({ error: "Internal Server Error " });
                }
                else {
                    return res
                        .status(401)
                        .json({
                        message: "This user does not have the permission to create a batch",
                    });
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
