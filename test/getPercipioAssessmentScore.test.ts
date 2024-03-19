import request from "supertest";
import app from "../src/app";
import Courses from '../src/models/courses';
import Percipio_Assessment from '../src/models/percipio_assessment';
import courseByCourseIdService from '../src/services/TraineeServices/courseByCourseIdService';
import percipioAssessmentScoreService from '../src/services/TraineeServices/percipioAssessmentScoreService';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzEwMTQ4NjE1LCJleHAiOjE3MTUzMzI2MTV9.N_V2wFHY1h11QP66AIumolZy-LFLHyy5N1Kv5j7pk_0";

describe("Percipio assessment score testing group", () => {
    it("Get Percipio Assessment score API testing", async () => {
        const res = await request(app).get("/api/v2/trainee/11/percipio/assessment").set('Authorization', authToken);
        expect(res.body).toHaveProperty("data");
        // expect(res.body).toHaveProperty("progressData");
    })

    it("Check Courses Model when finding a courses by courseID Test", async () => {
        const spyOn = jest.spyOn(Courses, "findOne");
        const findCourseById = await courseByCourseIdService(1);

        expect(findCourseById).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{course_id : 1},
        });
    });

    it("Check Percipio_Assessment Model when finding all the scores of the assessments taken by the trainee by traineeID Test", async () => {
        const spyOn = jest.spyOn(Percipio_Assessment, "findAll");
        const findPercipioAssessmentScoreById = await percipioAssessmentScoreService(1);

        expect(findPercipioAssessmentScoreById).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{trainee_id : 1},
        });
    });
})