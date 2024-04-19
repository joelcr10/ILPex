"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const trainees_1 = __importDefault(require("./trainees"));
const courses_1 = __importDefault(require("./courses"));
const percipio_assessment_1 = __importDefault(require("../../types/modelTypes/percipio_assessment"));
const batches_1 = __importDefault(require("./batches"));
percipio_assessment_1.default.init({
    percipio_assessment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: trainees_1.default,
            key: 'trainee_id',
        },
    },
    batch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: batches_1.default,
            key: "batch_id",
        }
    },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: courses_1.default,
            key: 'course_id',
        }
    },
    day_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    first_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    high_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    last_score: {
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
    modelName: 'percipio_assessment',
    tableName: 'percipio_assessment',
});
percipio_assessment_1.default.belongsTo(trainees_1.default, { foreignKey: 'trainee_id' });
percipio_assessment_1.default.belongsTo(courses_1.default, { foreignKey: 'course_id' });
percipio_assessment_1.default.belongsTo(batches_1.default, { foreignKey: 'batch_id' });
exports.default = percipio_assessment_1.default;
