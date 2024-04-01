"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = __importDefault(require("../../types/modelTypes/roles"));
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const sequelize_1 = require("sequelize");
roles_1.default.init({
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    role_name: {
        type: sequelize_1.DataTypes.STRING,
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
    modelName: 'roles',
    tableName: 'roles',
});
exports.default = roles_1.default;
