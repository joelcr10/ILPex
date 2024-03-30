"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
