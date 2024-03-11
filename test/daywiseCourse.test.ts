import request from "supertest";
import app from "../src/app";
import getDaywiseCourseServices from "../src/services/TraineeServices/getDaywiseCourseServices";
import Courses from "../src/models/courses";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Day wise course service test group", () =>{

    it("get day wise couse API test", async ()=>{

        const res = await request(app).get("/api/v3/course/day/1").set('Authorization', authToken);
        expect(res.body).toHaveProperty("message");
    })

    it("Checking Courses Model", async ()=>{

        const spyOn = jest.spyOn(Courses, "findOne");
        const result = await getDaywiseCourseServices(1);

        expect(result).toBeInstanceOf(Array);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({"attributes": ["course_name", "course_duration", "course_type", "day_number", "course_id"], "where": {"day_number": 1}});
    })



    
})