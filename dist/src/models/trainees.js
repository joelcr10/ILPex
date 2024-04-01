"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const sequelize_1 = require("sequelize");
const users_1 = __importDefault(require("./users"));
const trainees_1 = __importDefault(require("../../types/modelTypes/trainees"));
const batches_1 = __importDefault(require("./batches"));
trainees_1.default.init({
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users_1.default,
            key: 'user_id',
        }
    },
    batch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: batches_1.default,
            key: 'batch_id',
        },
    },
    current_day: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_config_1.default.literal('CURRENT_TIMESTAMP'),
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_config_1.default.literal('CURRENT_TIMESTAMP'),
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'trainee',
    tableName: 'trainee'
});
users_1.default.hasOne(trainees_1.default, { foreignKey: 'user_id' });
trainees_1.default.belongsTo(users_1.default, { foreignKey: 'user_id' });
trainees_1.default.belongsTo(batches_1.default, { foreignKey: 'batch_id' });
exports.default = trainees_1.default;
