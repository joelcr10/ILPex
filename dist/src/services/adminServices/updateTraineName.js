"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const updateTraineeName = (user, user_name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const trainee = yield user.update({ user_name: user_name });
    return trainee;
});
exports.default = updateTraineeName;
