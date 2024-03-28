"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const batches_1 = __importDefault(require("./batches"));
const course_batch_allocation_1 = __importDefault(require("../../types/modelTypes/course_batch_allocation"));
const moment_1 = __importDefault(require("moment"));
const course_set_1 = __importDefault(require("./course_set"));
course_batch_allocation_1.default.init({
    course_batch_allocation_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    course_set_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: course_set_1.default,
            key: 'course_set_id'
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
    modelName: 'course_batch_allocation',
    tableName: 'course_batch_allocation',
});
course_batch_allocation_1.default.belongsTo(course_set_1.default, { foreignKey: 'course_set_id' });
course_batch_allocation_1.default.hasMany(batches_1.default, { foreignKey: 'batch_id' });
exports.default = course_batch_allocation_1.default;
