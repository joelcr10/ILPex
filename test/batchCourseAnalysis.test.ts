import request from "supertest";
import app from "../src/app";
import findBatchByBatchIdServices from "../src/services/l_and_d_services/traineeAnalysis/findBatchByBatchIdServices";
import findTraineesOfABatchServices from "../src/services/l_and_d_services/traineeAnalysis/findTraineesOfABatchServices";
import findNumberOfCoursesByDayNumber from "../src/services/l_and_d_services/traineeAnalysis/findNumberOfCoursesByDayNumber";
import findTraineeStatusServices from "../src/services/l_and_d_services/traineeAnalysis/findTraineeStatusServices";
import Batches from "../types/modelTypes/batches";
import Trainees from "../types/modelTypes/trainees";
import Courses from "../types/modelTypes/courses";
import Trainee_Progress from "../types/modelTypes/trainee_progress";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Batch Course analysis Testing Group", () => {

    it("Get Batch Course Analysis API Testing ", async () => {
        const res = await request(app).get("/api/v2/analysis/2").set('Authorization', authToken);
        expect(res.body).toHaveProperty("onTrack");
        expect(res.body).toHaveProperty("laggingBehind");
    })

    it("Check Batches Model when finding a batch by ID Test", async () => {
        const spyOn = jest.spyOn(Batches, "findOne");
        const findBatchById = await findBatchByBatchIdServices(2);

        expect(findBatchById).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id : 2},
        });
    });

    it("Check Batches Model when finding a set of Trainees Test", async () => {
        const spyOn = jest.spyOn(Trainees, "findAll");
        const findBatchById = await findTraineesOfABatchServices(2);

        expect(findBatchById).toBeInstanceOf(Array);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id : 2},
        });
    });

    it("Check for finding the number of courses by sending the day id Test", async() => {
        const spyOn = jest.spyOn(Courses, "count");
        const numberOfCourses = await findNumberOfCoursesByDayNumber(5);

        expect(typeof numberOfCourses).toBe('number');
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{day_number : 5},
        });
    })

    it("Find Trainee status by passing current day and trainee id Test", async() => {
        const spyOn = jest.spyOn(Trainee_Progress, "count");
        const findTraineeCompletionStatus = await findTraineeStatusServices(1,6);
        
        expect(typeof findTraineeCompletionStatus).toBe('number');
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{trainee_id : 1, day_number : 6}
        });
    })
})
