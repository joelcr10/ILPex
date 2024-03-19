"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_config_1 = tslib_1.__importDefault(require("../config/sequelize-config"));
const sequelize_1 = require("sequelize");
const users_1 = tslib_1.__importDefault(require("../../types/modelTypes/users"));
const roles_1 = tslib_1.__importDefault(require("./roles"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const moment_1 = tslib_1.__importDefault(require("moment"));
users_1.default.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    percipio_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_uuid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: roles_1.default,
            key: "role_id",
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
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "users",
    tableName: "users",
    hooks: {
        beforeCreate: (user) => {
            const hashedPassword = bcrypt_1.default.hashSync(user.password, bcrypt_1.default.genSaltSync(10));
            user.password = hashedPassword;
        }
    }
});
users_1.default.belongsTo(roles_1.default, { foreignKey: "role_id", targetKey: "role_id" });
exports.default = users_1.default;
