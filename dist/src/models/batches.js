"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const sequelize_config_1 = tslib_1.__importDefault(require("../config/sequelize-config"));
const batches_1 = tslib_1.__importDefault(require("../../types/modelTypes/batches"));
const moment_1 = tslib_1.__importDefault(require("moment"));
batches_1.default.init({
    batch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    batch_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
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
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: (0, moment_1.default)(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
        get: function () {
            var isoDateString = new Date(this.getDataValue("createdAt"));
            return new Date(isoDateString.getTime() -
                isoDateString.getTimezoneOffset() * 60 * 1000);
        },
    }
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'batches',
    tableName: 'batches',
    timestamps: false,
});
exports.default = batches_1.default;
