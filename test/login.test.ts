import request from 'supertest';
import app from "../src/app";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Login test group", () =>{
    test.skip("Admin Login test", async () =>{
        const reqBody = {
            email:"godseye@experiontest.com",
            password: "1234"
        }

        const res = await request(app).post("/api/v1/authentication/login").send(reqBody);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user_id");
        expect(res.body).toHaveProperty("role_id");
        expect(res.body.role_id).toBe("101");
    })

    test.skip("Trainee Login test", async () =>{
        const reqBody = {
            email: "joel.raju@experionglobal.com",
            password: "Nehra@explearning"
        }

        const res = await request(app).post("/api/v1/authentication/login").send(reqBody);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user_id");
        expect(res.body).toHaveProperty("role_id");
        expect(res.body.role_id).toBe("103");
        expect(res.body).toHaveProperty("trainee_id");



    })

    test.skip("Invalid Credentials [error]", async () =>{
        const reqBody = {
            email:"testing.com",
            password: "Nehra@explearning"
        }

        const res = await request(app).post("/api/v1/authentication/login").send(reqBody)
        expect(res.body).toHaveProperty("error");
    })
})