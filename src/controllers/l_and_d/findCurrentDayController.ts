import { Request, Response } from "express";
import getBatchService from "../../services/TraineeServices/assessmentServices/getBatchService";
import getWorkingDaysServices from "../../services/l_and_d_Services/getWorkingDaysServices";
import moment from "moment";
import getWorkingDaysInclSaturdayServices from "../../services/l_and_d_Services/getWokingDaysInclSaturdayServices";

const findCurrentDayController = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, { message: string }>>> => {
  try {
    const batch_id: number = parseInt(req.params.batch_id as string);
    const current_date: string = req.params.current_date;
    if (!batch_id || !current_date)
      return res.status(404).json({
        message:
          "Missing Fields! Make sure Batch ID and Current Date is Present",
      });

    const findBatch = await getBatchService(batch_id);

    if (findBatch) {
      const start_date = findBatch.start_date;
      const end_date = findBatch.end_date;
      const include_saturdays = findBatch.include_saturdays;
      let dayDateMappingList = [];
      if (include_saturdays) {
        dayDateMappingList = getWorkingDaysInclSaturdayServices(
          start_date,
          end_date
        );
      } else {
        dayDateMappingList = getWorkingDaysServices(start_date, end_date);
      }

      const compareCurrentDateValue = new Date("2024-03-31");
      if (compareCurrentDateValue >= end_date) {
        return res.status(200).json({ current_day: dayDateMappingList.length });
      }

      const dayDateMappingListString: string[] = [];

      //Converting each date to string trimming the time part
      dayDateMappingList.forEach((date: any, index: any) => {
        const convertedDate = moment(date)
          .utcOffset("+05:30")
          .format("YYYY-MM-DD");
        dayDateMappingListString[index] = convertedDate;
      });

      let currentDay;
      if (include_saturdays) {
        if (dayDateMappingListString.indexOf(current_date) === -1) {
          const currentDateInDateFormat = new Date(current_date);
          const dayOfWeek = currentDateInDateFormat.getDay();
          let daysToSubtract = 0;
          if (dayOfWeek === 0) {
            daysToSubtract = 2;
          }
          currentDateInDateFormat.setDate(
            currentDateInDateFormat.getDate() - daysToSubtract
          );

          const isoString = currentDateInDateFormat.toISOString();
          const dateString = isoString.substring(0, isoString.indexOf("T"));
          currentDay = dayDateMappingListString.indexOf(dateString) + 1;
        } else {
          currentDay = dayDateMappingListString.indexOf(current_date) + 1;
        }

        const currentDateForCompletionCheckDate: Date = new Date(current_date);
        if (currentDateForCompletionCheckDate > end_date) {
          currentDay = dayDateMappingListString.length;
        }

        return res.status(200).json({ current_day: currentDay });
      } else {
        if (dayDateMappingListString.indexOf(current_date) === -1) {
          const currentDateInDateFormat = new Date(current_date);
          const dayOfWeek = currentDateInDateFormat.getDay();
          let daysToSubtract = 0;
          if (dayOfWeek === 0) {
            daysToSubtract = 2;
          } else if (dayOfWeek === 6) {
            daysToSubtract = 1;
          }
          currentDateInDateFormat.setDate(
            currentDateInDateFormat.getDate() - daysToSubtract
          );

          const isoString = currentDateInDateFormat.toISOString();
          const dateString = isoString.substring(0, isoString.indexOf("T"));
          currentDay = dayDateMappingListString.indexOf(dateString) + 1;
        } else {
          currentDay = dayDateMappingListString.indexOf(current_date) + 1;
        }
        const currentDateForCompletionCheckDate: Date = new Date(current_date);
        if (currentDateForCompletionCheckDate > end_date)
          currentDay = dayDateMappingListString.length;

        return res.status(200).json({ current_day: currentDay });
      }
    } else
      return res.status(404).json({ error: "Such a batch does not exist!" });
  } catch (error) {
    return res.status(520).json({ error: "Unknown Error Occured : " + error });
  }
};

export default findCurrentDayController;
