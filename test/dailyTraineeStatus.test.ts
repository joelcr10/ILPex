import request from "supertest";
import app from "../src/app";


const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Daily trainee status : Day wise course", () =>{
    it("daily trainee status api test", async () =>{
        const res = await request(app).get("/api/v3/trainee/1/course/day/1").set('Authorization', authToken);
        expect(res.body).toHaveProperty("message");
        expect(res.status).toBe(200);
    })


    it("invalid day number", async () =>{
        const res = await request(app).get("/api/v3/trainee/1/course/day/0").set('Authorization', authToken);
        expect(res.body).toHaveProperty("message");
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid trainee_id or day_number");
    })
})