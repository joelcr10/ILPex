"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const findUserId_1 = tslib_1.__importDefault(require("../../services/adminServices/findUserId"));
const findTrainee_1 = tslib_1.__importDefault(require("../../services/adminServices/findTrainee"));
const updateTrainee_1 = tslib_1.__importDefault(require("../../services/adminServices/updateTrainee"));
const updateTraineName_1 = tslib_1.__importDefault(require("../../services/adminServices/updateTraineName"));
const updateTraineeEmail_1 = tslib_1.__importDefault(require("../../services/adminServices/updateTraineeEmail"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//...............................API to Manage Users...................................//
const updateTrainees = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // nigin.n@experionglobal.com
        console.log('Entered manageUsers');
        const { user_id, status, user_name, email } = req.body;
        if (!user_id && status !== 0 && user_name !== 0 && email !== 0) {
            return res.status(404).json({ message: 'All fields are required' });
        }
        else {
            const user = yield (0, findUserId_1.default)(user_id); //Service to find a user
            if (user == null) {
                return res.status(404).json({ message: 'No User Found' });
            }
            if (user.role_id == 103) {
                const trainee = yield (0, findTrainee_1.default)(user_id); //Service to find a trainee
                const user = yield (0, findUserId_1.default)(user_id);
                console.log(trainee);
                if (trainee == null) {
                    return res.status(404).json({ message: 'No Trainee Found' });
                }
                else {
                    if (status) {
                        const traine = yield (0, updateTrainee_1.default)(trainee, status); //Service to update a trainee
                        return res.status(200).json({ message: `trainee status changed to ${traine.isActive}` });
                    }
                    if (user_name && user) {
                        const traine = yield (0, updateTraineName_1.default)(user, user_name); //Service to update a trainee name.
                        return res.status(200).json({ message: `trainee name changed to ${traine.user_name}` });
                    }
                    if (email && user) {
                        const traine = yield (0, updateTraineeEmail_1.default)(user, email); //Service to update a trainee name.
                        return res.status(200).json({ message: `trainee email changed to ${traine.email}` });
                    }
                }
            }
            else {
                return res.status(404).json({ message: 'This user is not a trainee' });
            }
        }
    }
    catch (err) {
        return res.status(404).json({ error: err });
    }
});
exports.default = updateTrainees;
