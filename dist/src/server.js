"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_config_1 = tslib_1.__importDefault(require("./config/sequelize-config"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const app_1 = tslib_1.__importDefault(require("./app"));
app_1.default.use(body_parser_1.default.urlencoded({ extended: false }));
app_1.default.use(body_parser_1.default.json());
const PORT = process.env.PORT || 5432;
sequelize_config_1.default
    .sync({ force: false })
    .then(() => {
    console.log("Database connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
app_1.default.listen(PORT, () => console.log(`Listening!...`));
