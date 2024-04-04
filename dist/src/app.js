"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const traineeRoutes_1 = __importDefault(require("./routes/traineeRoutes"));
const authenticationRoute_1 = __importDefault(require("./routes/authenticationRoute"));
const l_and_d_routes_1 = __importDefault(require("./routes/l_and_d_routes"));
const superAdminRoutes_1 = __importDefault(require("./routes/superAdminRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://localhost:4200'] // Array of whitelisted origins
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/v1", authenticationRoute_1.default);
app.use("/api/v2", superAdminRoutes_1.default);
app.use("/api/v2", l_and_d_routes_1.default);
app.use("/api/v3", traineeRoutes_1.default);
exports.default = app;
