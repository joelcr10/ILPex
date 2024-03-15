import request from 'supertest';
import app from '../src/app';
import Trainees from '../src/models/trainees';
import getTraineeService from '../src/services/TraineeServices/assessmentServices/getTraineeService';
import Assessment_Batch_Allocation from '../src/models/assessment_batch_allocation';
import findAssessmentBatchMapping from '../src/services/TraineeServices/assessmentServices/findAssessmentBatchMappingService';
import Results from '../src/models/results';
import getExistingResultService from '../src/services/TraineeServices/assessmentServices/getExistingResultService';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";


describe("Update score test", () => {
    test("update score api", async () => {

        const reqBody = {
            assessment_id: 4,
            user_id: 9,
            score: 60
        }
        const res = await request(app).post("/api/v3/assessment").send(reqBody).set('Authorization', authToken);

        expect(res.body).toHaveProperty("message");

    })

    it("Checking Trainee Model", async () => {

        const spyOn = jest.spyOn(Trainees, "findOne");
        const result = await getTraineeService(3);

        expect(result).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where: { user_id: 3 },
        });
    });

    it("Checking Assessment_Batch_Allocation Model", async () => {

        const spyOn = jest.spyOn(Assessment_Batch_Allocation, "findOne");
        const result = await findAssessmentBatchMapping(1, 4);

        expect(result).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where: { batch_id: 1, assessment_id: 4 },
        });
    });

    it("Checking Results Model", async () => {

        const spyOn = jest.spyOn(Results, "findOne");
        const result = await getExistingResultService(1, 4);

        expect(result).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where: { assessment_batches_allocation_id: 1, trainee_id: 4 },
        });
    });
})

