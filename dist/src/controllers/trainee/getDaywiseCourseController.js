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
Object.defineProperty(exports, "__esModule", { value: true });
const getDaywiseCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try{
    //     const day_number = Number(req.params.id);
    //     if(!day_number){
    //         return res.status(400).json({message: "day number is missing"});
    //     }
    //     const result = await getDaywiseCourseServices(Number(day_number));
    //     if(result.length==0){
    //         return res.status(404).json({message: "couldn't find any course on that day"});
    //     }
    //     return res.status(200).json({message: result});
    // }catch(error){
    //     return res.status(500).json({message: 'Internal server error'});
    // }
});
exports.default = getDaywiseCourseController;
