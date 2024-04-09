"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const batches_1 = __importDefault(require("./batches"));
const assessments_1 = __importDefault(require("../models/assessments"));
const assessment_batch_allocation_1 = __importDefault(require("../../types/modelTypes/assessment_batch_allocation"));
assessment_batch_allocation_1.default.init({
    assessment_batch_allocation_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    assessment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: assessments_1.default,
            key: 'assessment_id'
        }
    },
    batch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: batches_1.default,
            key: 'batch_id'
        }
    },
    number_of_attempts: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    assessment_status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
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
    }
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'assessment_batch_allocation',
    tableName: 'assessment_batch_allocation',
});
assessment_batch_allocation_1.default.belongsTo(assessments_1.default, { foreignKey: 'assessment_id' });
assessment_batch_allocation_1.default.hasMany(batches_1.default, { foreignKey: 'batch_id' });
exports.default = assessment_batch_allocation_1.default;
