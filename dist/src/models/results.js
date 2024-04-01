"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const results_1 = __importDefault(require("../../types/modelTypes/results"));
const trainees_1 = __importDefault(require("./trainees"));
const assessment_batch_allocation_1 = __importDefault(require("./assessment_batch_allocation"));
results_1.default.init({
    result_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    assessment_batches_allocation_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: assessment_batch_allocation_1.default,
            key: 'assessment_batch_allocation_id'
        }
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: trainees_1.default,
            key: 'trainee_id',
        }
    },
    first_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    high_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    assessment_attempts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_config_1.default.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_config_1.default.literal('CURRENT_TIMESTAMP'),
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'results',
    tableName: 'results',
});
assessment_batch_allocation_1.default.belongsTo(results_1.default, { foreignKey: 'assessment_batch_allocation_id' });
results_1.default.belongsTo(trainees_1.default, { foreignKey: 'trainee_id' });
exports.default = results_1.default;
