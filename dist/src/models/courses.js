"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const sequelize_1 = require("sequelize");
const courses_1 = __importDefault(require("../../types/modelTypes/courses"));
const course_set_1 = __importDefault(require("./course_set"));
courses_1.default.init({
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    course_set_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: course_set_1.default,
            key: 'course_set_id',
        },
    },
    day_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    course_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    course_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    course_duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
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
    modelName: 'courses',
    tableName: 'courses',
});
course_set_1.default.hasMany(courses_1.default, { foreignKey: 'course_set_id' });
exports.default = courses_1.default;
