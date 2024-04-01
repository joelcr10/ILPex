import request from "supertest";
import app from "../src/app";
import Batches from "../types/modelTypes/batches";
import batchDetailsServices from "../src/services/l_and_d_Services/batchDetailsServices";
import Trainees from "../types/modelTypes/trainees";
import getTraineesCount from "../src/services/l_and_d_Services/getTraineesCount";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Batch Details service test group", () =>{

    it("getBatchDetails  API test", async ()=>{

        const res = await request(app).get("/api/v2/batch/1").set('Authorization', authToken);
        expect(res.body).toHaveProperty("batch_details");
        expect(res.body).toHaveProperty("noOfTrainees");
    })

    it("Checking Batch Model", async ()=>{

        const spyOn = jest.spyOn(Batches, "findOne");
        const result = await batchDetailsServices(1);

        expect(result).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id:1},
            attributes: ['batch_name', 'start_date', 'end_date', 'isActive'],
            });
        });

        it("number of trainees when batch id is passed", async ()=>{

            const spyOn = jest.spyOn(Trainees, "count");
            const result = await getTraineesCount(1);
    
            expect(typeof result).toBe('number');
            expect(spyOn).toHaveBeenCalledTimes(1);
            expect(spyOn).toHaveBeenCalledWith({
                where: { batch_id:1},
                });
            });
    })
    