"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const questions_1 = __importDefault(require("../../types/modelTypes/questions"));
const assessments_1 = __importDefault(require("../models/assessments"));
questions_1.default.init({
    question_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    assessment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: assessments_1.default,
            key: 'assessment_id',
        }
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    option_a: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    option_b: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    option_c: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    option_d: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correct_answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
    modelName: "questions",
    tableName: "questions"
});
exports.default = questions_1.default;
