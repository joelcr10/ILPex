import request from 'supertest';
import app from '../src/app';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";


describe("Update score test group", () =>{
    test("update score api", async () =>{

        const reqBody = {
            assessment_id: 5,
            user_id: 5,
            score: 79
        }
        const res = await request(app).post("/api/v3/assessment").send(reqBody).set('Authorization', authToken);

        expect(res.body).toHaveProperty("message");

    })
})

