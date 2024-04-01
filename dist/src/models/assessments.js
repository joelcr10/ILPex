"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const assessments_1 = __importDefault(require("../../types/modelTypes/assessments"));
const users_1 = __importDefault(require("./users"));
assessments_1.default.init({
    assessment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    assessment_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: users_1.default,
            key: 'user_id',
        },
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
    modelName: 'assessments',
    tableName: 'assessments',
});
users_1.default.hasMany(assessments_1.default, { foreignKey: 'createdBy' });
exports.default = assessments_1.default;
