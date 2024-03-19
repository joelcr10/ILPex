"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const roles_1 = tslib_1.__importDefault(require("../../models/roles"));
const superAdminRegistration = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, user_name, password, role_id } = req.body;
        if (!email || !user_name || !password || !role_id) {
            return res.status(404).json({ error: "All fields are required" });
        }
        const createSuperAdminRole = yield roles_1.default.findOrCreate({
            where: { role_id: 101 },
            defaults: {
                role_id: 101,
                role_name: 'Super Admin'
            }
        });
        const createLearning_And_Development_Role = yield roles_1.default.findOrCreate({
            where: { role_id: 102 },
            defaults: {
                role_id: 102,
                role_name: 'Learning And Development'
            }
        });
        const createTrainneRole = yield roles_1.default.findOrCreate({
            where: { role_id: 103 },
            defaults: {
                role_id: 103,
                role_name: 'Trainee'
            }
        });
        if (role_id == 101) {
            const existingUser = yield users_1.default.findOne({ where: { email: email } });
            if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.email) === email) {
                return res.status(404).json({ error: "This user already exists" });
            }
            else {
                const newUser = yield users_1.default.create({
                    email: email,
                    user_name: user_name,
                    password: password,
                    role_id: role_id,
                });
                return res.status(200).json({
                    message: `Super Admin Has Been Created Successfully!.`,
                    notification: ` Super Admin ID : ${newUser.user_id}`,
                });
            }
        }
        else {
            return res.status(404).json({ error: "Invalid Role ID For Super Admin! Role ID Should be 101" });
        }
    }
    catch (err) {
        console.log("Error Caught :", err);
        return res.status(200).json({ error: err });
    }
});
exports.default = superAdminRegistration;
