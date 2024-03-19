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
const users_1 = __importDefault(require("../../models/users"));
const roles_1 = __importDefault(require("../../models/roles"));
const superAdminRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
