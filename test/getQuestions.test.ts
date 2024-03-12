import request from 'supertest';
import app from '../src/app';
import Questions from '../src/models/questions';
import getQuestionsService from '../src/services/TraineeServices/assessmentServices/getQuestionsService';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";


describe("Get questions test", () => {
    it("getQuestionsForAssessment  API test", async ()=>{

        const res = await request(app).get("/api/v3/assessment/4").set('Authorization', authToken);
        expect(res.body).toHaveProperty("questions");
    })


    it("Checking Questions Model", async () => {

        const spyOn = jest.spyOn(Questions, "findAll");
        const result = await getQuestionsService(4);

        expect(result).toBeInstanceOf(Array);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where: { assessment_id: 4 },
                attributes: [
      "question_id",
      "question",
      "option_a",
      "option_b",
      "option_c",
      "option_d",
      "correct_answer",
    ],
        });
    });
})

