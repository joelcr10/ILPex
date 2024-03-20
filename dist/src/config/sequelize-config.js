"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
    throw new Error('Please provide values for PGHOST, PGDATABASE, PGUSER, and PGPASSWORD in the .env file.');
}
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    dialectOptions: {
        useUTC: false,
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
        typeCast: function (field, next) {
            if (field.type == 'DATE' || field.type == 'TIMESTAMP') {
                return new Date(field.string() + 'Z');
            }
            return next();
        }
    },
    // timezone : '+05:30'
});
exports.default = exports.sequelize;
