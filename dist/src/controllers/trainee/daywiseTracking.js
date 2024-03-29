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
const daywiseTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainee_id = Number(req.params.trainee_id);
    const day_number = Number(req.params.day_number);
    if (!trainee_id || !day_number) {
        return res.status(400).json({ message: "Invalid trainee_id or day_number" });
    }
    // const courses = await getDaywiseCourseServices(day_number);
    // if(courses==null){
    //     return res.status(404).json({message: 'error getting day wise courses'});
    // }
    // const progress = await getDayTraineeProgress(trainee_id,day_number);
    // if(progress==null){
    //     return res.status(404).json({message: "error getting trainee progress"});
    // }
    // const courseProgress = await daywiseCourseStatus(courses,progress);
    // if(courseProgress.length==0){
    //     return res.status(400).json({message: 'Error fetching status of day wise courses'});
    // }
    // return res.status(200).json({message: courseProgress});
});
exports.default = daywiseTracking;
