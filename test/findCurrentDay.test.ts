import request from "supertest";
import app from "../src/app";
import findBatchByBatchIdServices from "../src/services/l_and_d_Services/traineeAnalysis/findBatchByBatchIdServices";
import Batches from "../types/modelTypes/batches";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Find current day Testing Group", () => {

    it("Find Current Day API Testing ", async() => {
        const res = await request(app).get("/api/v3/batch/2/day/2024-03-12").set('Authorization', authToken);
    expect(res.body).toHaveProperty("current_day");
    })

    it("Check Batches Model when finding a batch by ID Test", async () => {
        const spyOn = jest.spyOn(Batches, "findOne");
        const findBatchById = await findBatchByBatchIdServices(2);

        expect(findBatchById).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({
            where:{batch_id : 2},
        });
    });
})
