import request from "supertest";
import app from "../src/app";
import getDaywiseCourseServices from "../src/services/TraineeServices/getDaywiseCourseServices";
import Courses from "../src/models/courses";
import Users from "../types/modelTypes/users";
import { sendOTPByEmail } from "../src/services/authentication/sendOTPByEmailService";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Send OTP via email test group", () =>{

    it(" Send OTP via email API test", async ()=>{
        const reqBody ={ 
            email:"sreejaya.vs@experionglobal.com", 
            }
        const res = await request(app).post("/api/v1/authentication/forgotpassword").send(reqBody);
        expect(res.body).toHaveProperty("message");
    })

    it("Checking Users Model test", async ()=>{

        const spyOn = jest.spyOn(Users, "findOne");
        const result = await sendOTPByEmail("sreejaya.vs@experionglobal.com");

        expect(typeof result).toBe("boolean");
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({where: { email: "sreejaya.vs@experionglobal.com" }});
    })
    
})