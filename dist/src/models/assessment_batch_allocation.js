"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const sequelize_config_1 = tslib_1.__importDefault(require("../config/sequelize-config"));
const batches_1 = tslib_1.__importDefault(require("./batches"));
const assessments_1 = tslib_1.__importDefault(require("../models/assessments"));
const assessment_batch_allocation_1 = tslib_1.__importDefault(require("../../types/modelTypes/assessment_batch_allocation"));
const moment_1 = tslib_1.__importDefault(require("moment"));
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
    modelName: 'assessment_batch_allocation',
    tableName: 'assessment_batch_allocation',
});
assessment_batch_allocation_1.default.belongsTo(assessments_1.default, { foreignKey: 'assessment_id' });
assessment_batch_allocation_1.default.hasMany(batches_1.default, { foreignKey: 'batch_id' });
exports.default = assessment_batch_allocation_1.default;
