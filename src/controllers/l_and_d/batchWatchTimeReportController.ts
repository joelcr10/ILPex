import e, { Request,Response } from "express";
import findBatchByBatchIdServices from "../../services/l_and_d_services/trainee_analysis/findBatchByBatchIdServices";
import getWorkingDaysServices from "../../services/l_and_d_services/getWorkingDaysServices";
import moment from "moment";
import findTraineesOfABatchServices from "../../services/l_and_d_services/trainee_analysis/findTraineesOfABatchServices";
import findNumberOfCoursesByDayNumber from "../../services/l_and_d_services/trainee_analysis/findNumberOfCoursesByDayNumber";
import findTraineeStatusServices from "../../services/l_and_d_services/trainee_analysis/findTraineeStatusServices";
import Trainees from "../../models/trainees";
import getTraineePercipioData from "../../services/l_and_d_services/getTraineePericpioData";
import findTraineeNameByUserIdServices from "../../services/l_and_d_services/findTraineeNameByUserIdServices";
import findBatchNameByBatchIdServices from "../../services/l_and_d_services/trainee_analysis/findBatchNameByBatchIdServices";

const batchWatchTimeReportController  = async(req : Request, res : Response) => {

    let twoTimesWatchSpeed : number = 0;
    let onePointFiveWatchSpeed : number = 0;
    let oneWatchSpeed : number = 0;
    let lessThanOneWatchSpeed : number = 0;
    let haveNotWatchedAnyVideo : number = 0;

    let twoTimesWatchSpeedTraineesList : TraineeObject [] = [];
    let onePointFiveWatchSpeedTraineesList : TraineeObject [] = [];
    let oneWatchSpeedTraineesList : TraineeObject [] = [];
    let lessThanOneWatchSpeedTraineesList : TraineeObject [] = [];
    let haveNotWatchedAnyVideoTraineesList : TraineeObject [] = [];

    interface TraineeObject {
        user_id: number | undefined,
        trainee_id: any,
        user_name : string
    }

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
                    if(findTraineeName)
                    {
                        const traineeObject = {
                            user_id: findTraineeName.user_id,
                            trainee_id: trainee_id,
                            user_name : findTraineeName.user_name
                        };

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
                                    twoTimesWatchSpeedTraineesList.push(traineeObject);
                                }
                                else if (watchTimeRatio > 50 && watchTimeRatio <= 67) {
                                    onePointFiveWatchSpeed = onePointFiveWatchSpeed + 1;
                                    onePointFiveWatchSpeedTraineesList.push(traineeObject);
                                }
                                else if (watchTimeRatio > 67 && watchTimeRatio <= 100) {
                                    oneWatchSpeed = oneWatchSpeed + 1;
                                    oneWatchSpeedTraineesList.push(traineeObject);
                                }
    
                                else {
                                    lessThanOneWatchSpeed = lessThanOneWatchSpeed + 1;
                                    lessThanOneWatchSpeedTraineesList.push(traineeObject);
                                }
                            }
    
                            else {
                                haveNotWatchedAnyVideo = haveNotWatchedAnyVideo + 1;
                                haveNotWatchedAnyVideoTraineesList.push(traineeObject);
                            }
                        }
                    }

                };
                return res.status(200).json({
                    data : {
                        batch_name : batchName.batch_name,
                        twoTimesWatchSpeed : twoTimesWatchSpeed,
                        onePointFiveWatchSpeed : onePointFiveWatchSpeed,
                        oneWatchSpeed : oneWatchSpeed,
                        lessThanOneWatchSpeed : lessThanOneWatchSpeed, 
                        haveNotWatchedAnyVideo : haveNotWatchedAnyVideo,
                        twoTimesWatchSpeedTraineesList : twoTimesWatchSpeedTraineesList, 
                        onePointFiveWatchSpeedTraineesList : onePointFiveWatchSpeedTraineesList, 
                        oneWatchSpeedTraineesList : oneWatchSpeedTraineesList,
                        lessThanOneWatchSpeedTraineesList : lessThanOneWatchSpeedTraineesList,
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