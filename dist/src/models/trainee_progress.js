"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_config_1 = tslib_1.__importDefault(require("../config/sequelize-config"));
const sequelize_1 = require("sequelize");
const trainee_progress_1 = tslib_1.__importDefault(require("../../types/modelTypes/trainee_progress"));
const trainees_1 = tslib_1.__importDefault(require("./trainees"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const courses_1 = tslib_1.__importDefault(require("./courses"));
const batches_1 = tslib_1.__importDefault(require("./batches"));
trainee_progress_1.default.init({
    progress_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: trainees_1.default,
            key: 'trainee_id',
        },
    },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: courses_1.default,
            key: 'course_id'
        },
    },
    batch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: batches_1.default,
            key: 'batch_id'
        }
    },
    day_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    completion_status: {
        type: sequelize_1.DataTypes.ENUM('ONGOING', 'COMPLETED'),
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    estimated_duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
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
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'trainee_progress',
    tableName: 'trainee_progress',
});
trainee_progress_1.default.belongsTo(trainees_1.default, { foreignKey: 'trainee_id' });
trainee_progress_1.default.belongsTo(courses_1.default, { foreignKey: 'course_id' });
trainee_progress_1.default.hasMany(batches_1.default, { foreignKey: 'batch_id' });
exports.default = trainee_progress_1.default;
