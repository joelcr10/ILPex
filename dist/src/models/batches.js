"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const batches_1 = __importDefault(require("../../types/modelTypes/batches"));
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
    include_saturdays: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isActive: {
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
        defaultValue: sequelize_config_1.default.literal("CURRENT_TIMESTAMP"),
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_config_1.default.literal("CURRENT_TIMESTAMP"),
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "batches",
    tableName: "batches",
    timestamps: false,
});
exports.default = batches_1.default;
