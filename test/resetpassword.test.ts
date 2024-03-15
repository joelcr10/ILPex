import request from 'supertest';
import app from "../src/app";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Reset Password test group", () =>{
    test("Sreejaya V S reset password test", async () =>{
        const reqBody ={ 
            email:"sreejaya.vs@experionglobal.com", 
             newPassword:"Akshara@explearning", 
             confirmPassword:"Akshara@explearning"
            }

        const res = await request(app).post("/api/v1/authentication/resetPassword").send(reqBody);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("user_id");
        expect(res.body).toHaveProperty("user_name");
        expect(res.body.user_id).toBe("6");
    })

    test("Invalid user reset password test", async () =>{
        const reqBody ={ 
            email:"sreejaya.vs@experionglobal.co", 
             newPassword:"Akshara@explearning", 
             confirmPassword:"Akshara@explearning"
            }

        const res = await request(app).post("/api/v1/authentication/resetPassword").send(reqBody);
        expect(res.body).toHaveProperty("error");
        expect(res.body.error.message).toBe("No such user found");
    })
})