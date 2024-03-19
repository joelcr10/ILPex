"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const users_1 = tslib_1.__importDefault(require("../../models/users"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//......................................Users List API........................................//
const getUsers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const names = yield users_1.default.findAll({ attributes: ['user_name', 'user_id'] });
        return res.json(names);
    }
    catch (err) {
        return res.json(err);
    }
});
exports.default = getUsers;
