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
const express_1 = __importDefault(require("express"));
const findUserId_1 = __importDefault(require("../../services/adminServices/findUserId"));
const findTrainee_1 = __importDefault(require("../../services/adminServices/findTrainee"));
const updateTrainee_1 = __importDefault(require("../../services/adminServices/updateTrainee"));
const updateTraineName_1 = __importDefault(require("../../services/adminServices/updateTraineName"));
const updateTraineeEmail_1 = __importDefault(require("../../services/adminServices/updateTraineeEmail"));
const updatePercipioMailService_1 = __importDefault(require("../../services/adminServices/updatePercipioMailService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const updateTrainees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Entered manageUsers');
        const { user_id, status, user_name, email, percipio_email } = req.body;
        // Check if user_id and status are provided
        if (!user_id || status === undefined) {
            return res.status(400).json({ message: 'Both user_id and status are required' });
        }
        // If status is null, update with the fields from req.body
        if (status === null) {
            const user = yield (0, findUserId_1.default)(user_id);
            if (!user) {
                return res.status(404).json({ message: 'No User Found' });
            }
            if (user.role_id !== 103) {
                return res.status(404).json({ message: 'This user is not a trainee' });
            }
            if (user_name && user) {
                yield (0, updateTraineName_1.default)(user, user_name);
            }
            if (email && user) {
                yield (0, updateTraineeEmail_1.default)(user, email);
            }
            if (percipio_email && user) {
                yield (0, updatePercipioMailService_1.default)(user, percipio_email);
            }
            return res.status(200).json({ message: 'Trainee fields updated successfully' });
        }
        // If status is provided, update trainee status
        if (status === 0 || status === 1) {
            const trainee = yield (0, findTrainee_1.default)(user_id);
            if (!trainee) {
                return res.status(404).json({ message: 'No Trainee Found' });
            }
            yield (0, updateTrainee_1.default)(trainee, status);
            return res.status(200).json({ message: `Trainee status changed to ${status}` });
        }
        return res.status(400).json({ message: 'Invalid status value' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.default = updateTrainees;
