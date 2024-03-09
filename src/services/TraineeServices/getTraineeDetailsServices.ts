import Batches from "../../models/batches";
import Trainees from "../../models/trainees";
import Users from "../../models/users";
import getTraineeCurrentDay from "./getTraineeCurrentday";



const getTraineeDetails=async(user_id:number)=>{
            const trainee=await Users.findOne(
                {
                    include:[
                    {
                    //Join Trainee table 
                      model:Trainees,
                      required:false,
                       attributes:['trainee_id','user_id','batch_id','isActive'],
                       include: [
                        {
                          //Join Batch Table 
                          model: Batches,
                          attributes: ['batch_name'],
                        },
                      ],
                  },
                  ], 
                    // attributes:['trainee_id','user_id','batch_id','isActive'],
                    where:{user_id:user_id},
                    attributes: ['user_name','email','percipio_email','role_id'],
                }  
            );


           return  trainee;
}

export default getTraineeDetails;