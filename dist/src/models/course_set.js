"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const course_set_1 = __importDefault(require("../../types/modelTypes/course_set"));
const users_1 = __importDefault(require("./users"));
const moment_1 = __importDefault(require("moment"));
course_set_1.default.init({
    course_set_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    course_set_name: {
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
        defaultValue: (0, moment_1.default)(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
        get: function () {
            var isoDateString = new Date(this.getDataValue("createdAt"));
            return new Date(isoDateString.getTime() -
                isoDateString.getTimezoneOffset() * 60 * 1000);
        },
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: (0, moment_1.default)(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
        get: function () {
            var isoDateString = new Date(this.getDataValue("updatedAt"));
            return new Date(isoDateString.getTime() -
                isoDateString.getTimezoneOffset() * 60 * 1000);
        },
    }
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'course_set',
    tableName: 'course_set',
});
users_1.default.hasMany(course_set_1.default, { foreignKey: 'createdBy' });
exports.default = course_set_1.default;
