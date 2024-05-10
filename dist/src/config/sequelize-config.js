"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// import dotenv from "dotenv";
// dotenv.config();
// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
// if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
//   throw new Error(
//     "Please provide values for PGHOST, PGDATABASE, PGUSER, and PGPASSWORD in the .env file."
//   );
// }
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    //dialect : 'mysql',
    // host: PGHOST,
    // database: PGDATABASE,
    // username: PGUSER,
    // password: PGPASSWORD,
    host: "ep-wispy-silence-a1ohwxqp-pooler.ap-southeast-1.aws.neon.tech",
    database: "ilpex",
    username: "varghesenigin2001",
    password: "rUJsM9Lbp2Oo",
    port: 5432,
    logging: false,
    dialectOptions: {
        useUTC: false,
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        typeCast: function (field, next) {
            if (field.type == "DATE" || field.type == "TIMESTAMP") {
                return new Date(field.string() + "Z");
            }
            return next();
        },
    },
    // timezone : '+05:30'
});
exports.default = exports.sequelize;
