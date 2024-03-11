import request from 'supertest';
import app from "../src/app";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Verify OTP test group", () =>{
    test("successfull verification test", async () =>{
        const reqBody ={
             email :"sreejaya.vs@experionglobal.com",
              enteredOtp:"8591" 
            } 

        const res = await request(app).post("/api/v1/authentication/verification").send(reqBody);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("success");
    })

})