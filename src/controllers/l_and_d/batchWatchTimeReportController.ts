import e, { Request,Response } from "express";
import findBatchByBatchIdServices from "../../services/l_and_d_services/traineeAnalysis/findBatchByBatchIdServices";
import getWorkingDaysServices from "../../services/l_and_d_services/getWorkingDaysServices";
import moment from "moment";
import findTraineesOfABatchServices from "../../services/l_and_d_services/traineeAnalysis/findTraineesOfABatchServices";
import findNumberOfCoursesByDayNumber from "../../services/l_and_d_services/traineeAnalysis/findNumberOfCoursesByDayNumber";
import findTraineeStatusServices from "../../services/l_and_d_services/traineeAnalysis/findTraineeStatusServices";
import Trainees from "../../models/trainees";
import getTraineePercipioData from "../../services/l_and_d_services/getTraineePericpioData";
import findTraineeNameByUserIdServices from "../../services/l_and_d_services/findTraineeNameByUserIdServices";
import findBatchNameByBatchIdServices from "../../services/findBatchNameByBatchIdServices";

const batchWatchTimeReportController  = async(req : Request, res : Response) => {

    let twoTimesWatchSpeed : number = 0;
    let onePointFiveWatchSpeed : number = 0;
    let oneWatchSpeed : number = 0;
    let lessThanOnePointFiveWatchSpeed : number = 0;
    let haveNotWatchedAnyVideo : number = 0;

    let twoTimesWatchSpeedTraineesList : string [] = [];
    let onePointFiveWatchSpeedTraineesList : string [] = [];
    let oneWatchSpeedTraineesList : string [] = [];
    let lessThanOnePointFiveWatchSpeedTraineesList : string [] = [];
    let haveNotWatchedAnyVideoTraineesList : string [] = [];

    try {
        const batch_id :number = parseInt(req.params.batch_id as string);
        if(!batch_id)
            return res.status(401).json({error : "Please ensure that the Batch ID is Provided"});

        const findBatchById = await findBatchByBatchIdServices(batch_id);
        if(findBatchById)
        {
            const traineesList= await findTraineesOfABatchServices(batch_id);
            const batchName = await findBatchNameByBatchIdServices(batch_id);
            if(traineesList && batchName)
            {
                for(const trainee of traineesList)
                {
                    const trainee_id = trainee.dataValues.trainee_id;
                    const user_id = trainee.dataValues.user_id;
                    const findTraineeName = await findTraineeNameByUserIdServices(user_id);
                    const traineePercipioData = await getTraineePercipioData(trainee_id);
                    if (traineePercipioData && findTraineeName) {
                        if (traineePercipioData.length != 0) {
                            let watchTime = 0;
                            let realCourseDuration = 0;
                            traineePercipioData.forEach(async (traineePercipioData) => {
                                watchTime = watchTime + traineePercipioData.dataValues.duration;
                                realCourseDuration = realCourseDuration + traineePercipioData.dataValues.estimated_duration;
                            });
                            const watchTimeRatio = (watchTime / realCourseDuration) * 100;
                            if (watchTimeRatio > 0 && watchTimeRatio <= 50) {
                                twoTimesWatchSpeed = twoTimesWatchSpeed + 1;
                                twoTimesWatchSpeedTraineesList.push(findTraineeName.user_name);
                            }
                            else if (watchTimeRatio > 50 && watchTimeRatio <= 67) {
                                onePointFiveWatchSpeed = onePointFiveWatchSpeed + 1;
                                onePointFiveWatchSpeedTraineesList.push(findTraineeName.user_name);
                            }
                            else if (watchTimeRatio > 67 && watchTimeRatio <= 100) {
                                oneWatchSpeed = oneWatchSpeed + 1;
                                oneWatchSpeedTraineesList.push(findTraineeName.user_name);
                            }

                            else {
                                lessThanOnePointFiveWatchSpeed = lessThanOnePointFiveWatchSpeed + 1;
                                lessThanOnePointFiveWatchSpeedTraineesList.push(findTraineeName.user_name);
                            }
                        }

                        else {
                            haveNotWatchedAnyVideo = haveNotWatchedAnyVideo + 1;
                            haveNotWatchedAnyVideoTraineesList.push(findTraineeName.user_name);
                        }
                    }
                };
                return res.status(200).json({
                    data : {
                        batch_name : batchName.batch_name,
                        twoTimesWatchSpeed : twoTimesWatchSpeed,
                        onePointFiveWatchSpeed : onePointFiveWatchSpeed,
                        oneWatchSpeed : oneWatchSpeed,
                        lessThanOnePointFiveWatchSpeed : lessThanOnePointFiveWatchSpeed, 
                        haveNotWatchedAnyVideo : haveNotWatchedAnyVideo,
                        twoTimesWatchSpeedTraineesList : twoTimesWatchSpeedTraineesList, 
                        onePointFiveWatchSpeedTraineesList : onePointFiveWatchSpeedTraineesList, 
                        oneWatchSpeedTraineesList : oneWatchSpeedTraineesList,
                        lessThanOnePointFiveWatchSpeedTraineesList : lessThanOnePointFiveWatchSpeedTraineesList,
                        haveNotWatchedAnyVideoTraineesList : haveNotWatchedAnyVideoTraineesList
                    }
                })
            }
            else
            {
                return res.status(404).json({error : "There are no trainees in this batch"});
            }
        }
        else
        {
            return res.status(404).json({error : "Such A Batch Doesn't Exist"});
        }
    } catch(error) {
        return res.status(520).json({error : "Unknown Error Occured : " + error});   
    }
}

export default batchWatchTimeReportController;