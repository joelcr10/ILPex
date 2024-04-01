import request from "supertest";
import app from "../src/app";

import Batches from "../types/modelTypes/batches";
import batchDetailsServices from "../src/services/l_and_d_Services/batchDetailsServices";
import Trainees from "../types/modelTypes/trainees";
import getTraineesCount from "../src/services/l_and_d_Services/getTraineesCount";
import findTrainee from "../src/services/l_and_d_Services/findTrainee";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Batch Details service test group", () =>{

    // it("getBatchDetails  API test", async ()=>{

    //     const res = await request(app).get("/api/v2/batchAvg/1").set('Authorization', authToken);
    //     expect(res.body).toHaveProperty("average");
    //     expect(res.body).toHaveProperty("excellent");
    //     expect(res.body).toHaveProperty("good");
    //     expect(res.body).toHaveProperty("poor");
    // })

    it("Checking Batch Model", async ()=>{

        const spyOn = jest.spyOn(Trainees, "findAll");
        const result = await findTrainee(1);

        expect(result).toBeInstanceOf(Array);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            attributes:['trainee_id'],
            where:{batch_id:1}
            });
        });

    //     it("number of trainees when batch id is passed", async ()=>{

            
    //         const result = await traineList([1,2,3,4,5,6,7,8]);
    
    //         expect(typeof result).toBe('number');
    //         expect(spyOn).toHaveBeenCalledTimes(1);
    //         expect(spyOn).toHaveBeenCalledWith({
    //             where: { batch_id:1},
    //             });
    //         });

     })
    