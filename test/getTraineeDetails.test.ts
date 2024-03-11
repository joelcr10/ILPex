import request from "supertest";
import app from "../src/app";
import getTraineeDetails from "../src/services/TraineeServices/getTraineeDetailsServices";
import Users from "../types/modelTypes/users";
import Trainees from "../types/modelTypes/trainees";
import Batches from "../types/modelTypes/batches";

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JlZ19pZCI6MSwidXNlcnR5cGUiOjEwMSwiaWF0IjoxNzA5OTE1ODEwLCJleHAiOjE3MTUwOTk4MTB9.4NFWrcYJpPWGvYcTZ68RKQt97dgDwF24mM_dtNPX7K0";

describe("Trainee Details service test group", () =>{

    it("get profile API test", async ()=>{

        const res = await request(app).get("/api/v3/profile/6").set('Authorization', authToken);
        expect(res.body).toHaveProperty("data");
    })

    it("Checking User Model", async ()=>{

        const spyOn = jest.spyOn(Users, "findOne");
        const result = await getTraineeDetails(6);

        expect(result).toBeInstanceOf(Object);
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyOn).toHaveBeenCalledWith({

            include: [
                {
                  model: Trainees,
                  required: false,
                  attributes: ['trainee_id', 'user_id', 'batch_id', 'isActive'],
                  include: [
                    {
                      model: Batches,
                      attributes: ['batch_name'],
                    },
                  ],
                },
              ],
              where: { user_id: 6 },
              attributes: ['user_name', 'email', 'percipio_email', 'role_id'],
            });
        });
    })