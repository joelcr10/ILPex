import { Request,Response } from "express";
import findBatchByBatchIdServices from "../../services/l_and_d_services/traineeAnalysis/findBatchByBatchIdServices";
import getWorkingDaysServices from "../../services/l_and_d_services/getWorkingDaysServices";
import moment from "moment";
import findTraineesOfABatchServices from "../../services/l_and_d_services/traineeAnalysis/findTraineesOfABatchServices";
import findNumberOfCoursesByDayNumber from "../../services/l_and_d_services/traineeAnalysis/findNumberOfCoursesByDayNumber";
import findTraineeStatusServices from "../../services/l_and_d_services/traineeAnalysis/findTraineeStatusServices";

const batchCourseAnalysisController  = async(req : Request, res : Response) : Promise<any> => {

    let onTrack = 0;
    let laggingBehind = 0;
    try {
        const batch_id :number = parseInt(req.params.batch_id as string);
        if(!batch_id)
            return res.status(401).json({error : "Please ensure that the Batch ID is Provided"});
        else
        {
            const findBatchById = await findBatchByBatchIdServices(batch_id);
            if(findBatchById)
            {
                //Store Batch's start date, end date and Current date
                const batchStartDate = findBatchById.start_date;
                const batchEndDate = findBatchById.end_date;
                const currentDate = new Date();

                //Converting time format
                const currentStandardDate = moment(currentDate).utcOffset('+05:30').format("YYYY-MM-DD");
               
                //Find the list of working days and store them in 'dayDateMappingList' array (Excluding Sundays)
                const dayDateMappingList = getWorkingDaysServices(batchStartDate, batchEndDate);
                const dayDateMappingListString : string[] = [];

                //Converting each date to string trimming the time part
                dayDateMappingList.forEach((date, index) => {
                    const convertedDate = moment(date).utcOffset('+05:30').format("YYYY-MM-DD");
                    dayDateMappingListString[index] = convertedDate;
                });           
                console.log("hiiiiiiii");
                //Storing the current day
                const currentDay = dayDateMappingListString.indexOf(currentStandardDate);
               
                //Find the list of all Trainees belonging to the batch with the corresponding Batch ID
                const traineesList = await findTraineesOfABatchServices(batch_id);
                if(traineesList)
                {
                    if (Array.isArray(traineesList)) {
                        //Finding the number of courses in the particular day
                        const numberOfCourses = await findNumberOfCoursesByDayNumber(currentDay);
                        for (const trainee of traineesList) 
                        {
                            if (trainee.trainee_id !== undefined) 
                            {
                                //Check if the particular Trainee has completed all the courses till the previous day of when he/she is trying to generate the report
                                const findTraineeCompletionStatus = await findTraineeStatusServices(trainee.trainee_id, currentDay);
                                if (findTraineeCompletionStatus === numberOfCourses)
                                    onTrack++;
                                else
                                    laggingBehind++;
                            } 
                            else {
                                return res.status(404).json({ error: 'Trainee does not exist' });
                            }
                        }
                        return res.status(200).json({Message : `{OnTrack :${onTrack}, Lagging Behind : ${laggingBehind}}`})
                    }  
                    else
                    {
                        return res.status(404).json({error : 'Trainee does not exist'});
                    } 
                }
                else
                {
                    return res.status(404).json({error : "Trainees Doesnt Exist"});
                }
            }
            else
            {
                return res.status(404).json({error : "Such A Batch Doesn't Exist"});
            }
        }
    } catch(error) {
        return res.status(520).json({error : "Unknown Error Occured : " + error});   
    }
}

export default batchCourseAnalysisController;