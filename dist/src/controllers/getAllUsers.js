"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const getUsers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // try{
    // const names = await LandDtable.findAll({attributes:['name','user_id']})
    // const batches = await BatchTable.findAll({attributes:['name','user_id']})
    // const landdnames = names.map(users=>({name:users.name,id:users.user_id}));
    // // const batchnames = batches.map(users=>({name:users.name,id:users.user_id}));
    // const responseData ={
    //     landdnames:landdnames,
    //     // batchnames:batchnames
    // }
    // return res.json(responseData);
    // }catch(err){
    //     return res.json(err);
    // }
});
exports.default = getUsers;
