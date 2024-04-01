import request from "supertest";
import app from "../src/app";
import findBatchDayWiseProgressService from "../src/services/l_and_d_Services/batchDayWiseProgress/findBatchDayWiseProgressService";
import findBatch from "../src/services/adminServices/findBatch";
import getTraineesCount from "../src/services/l_and_d_Services/getTraineesCount";
import getBatchCurrentDay from "../src/services/l_and_d_Services/batchDayWiseProgress/getDayCountService";
import getDaywiseCourseServices from "../src/services/TraineeServices/getDaywiseCourseServices";
import Trainee_progress from '../src/models/trainee_progress';
import Courses from '../src/models/courses';
import Trainees from '../src/models/trainees';
import Batches from '../src/models/batches';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzEwMTQ4NjE1LCJleHAiOjE3MTUzMzI2MTV9.N_V2wFHY1h11QP66AIumolZy-LFLHyy5N1Kv5j7pk_0";

describe("Batch Day Wise Progress Testing Group", () => {
    it("Get Batch Day Wise Progress API Testing ", async () => {
        const res = await request(app).get("/api/v2/batch/1/progress").set('Authorization', authToken);
        expect(res.body).toHaveProperty("data");
        // expect(res.body).toHaveProperty("progressData");
    })

    it("Check Batches Model when finding a batch by ID Test", async () => {
        const spyOn = jest.spyOn(Batches, "findOne");
        const findBatchById = await findBatch(1);

        expect(findBatchById).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id : 1},
        });
    });

    it("Check Trainee_Progress Model when counting the numberof trainees with status COMPLETED", async () => {
        const spyOn = jest.spyOn(Trainee_progress, "count");
        const findBatchDayWiseProgress = await findBatchDayWiseProgressService(1,1);

        expect(typeof findBatchDayWiseProgress).toBe('number');
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id : 1,
                completion_status : "COMPLETED",
                day_number : 1},
        });
    });

    it("Check Trainees Model when counting the number of Trainees in a batch", async () => {
        const spyOn = jest.spyOn(Trainees, "count");
        const traineesCount = await getTraineesCount(1);

        expect(typeof traineesCount).toBe('number');
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id : 1},
        });
    });

    it("Check Trainee_Progress Model when finding the current day of a batch", async () => {
        const spyOn = jest.spyOn(Trainee_progress, "findAll");
        const currentDay = await getBatchCurrentDay(1);

        expect(currentDay).toBeInstanceOf(Array);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            "attributes": ['day_number'],
            "order":[['day_number','DESC']],
            "limit": 1,
            "where":{"batch_id" : 1}
    });
})

    it("Checking Courses Model", async ()=>{

        const spyOn = jest.spyOn(Courses, "findAll");
        const result = await getDaywiseCourseServices(1);

        expect(result).toBeInstanceOf(Array);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({"attributes": ["course_name", "course_duration", "course_type", "day_number", "course_id"], "where": {"day_number": 1}});
    })
})
