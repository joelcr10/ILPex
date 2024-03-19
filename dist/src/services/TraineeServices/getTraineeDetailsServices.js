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
const batches_1 = __importDefault(require("../../models/batches"));
const trainees_1 = __importDefault(require("../../models/trainees"));
const users_1 = __importDefault(require("../../models/users"));
const getTraineeDetails = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const trainee = yield users_1.default.findOne({
        include: [
            {
                //Join Trainee table 
                model: trainees_1.default,
                required: false,
                attributes: ['trainee_id', 'user_id', 'batch_id', 'isActive'],
                include: [
                    {
                        //Join Batch Table 
                        model: batches_1.default,
                        attributes: ['batch_name'],
                    },
                ],
            },
        ],
        // attributes:['trainee_id','user_id','batch_id','isActive'],
        where: { user_id: user_id },
        attributes: ['user_name', 'email', 'percipio_email', 'role_id'],
    });
    return trainee;
});
exports.default = getTraineeDetails;
