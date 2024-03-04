import Batches from "../../models/batches";
import Trainees from "../../models/trainees";
import Users from "../../models/users";



const getTraineeDetails=async(trainee_id:number)=>{
            const trainee=await Trainees.findOne(
                {
                    include:[
                      {
                        //Join Batches model
                        model:Batches,
                        required:true,
                         attributes: ['batch_name']
                    },
                    {
                    //Join User model
                      model:Users,
                      required:true,
                       attributes: ['user_name','email']
                  },
                  ], 
                  where:{trainee_id:trainee_id},
                    attributes:['trainee_id','user_id','batch_id','isActive'],
                }
            );

           return  trainee;
}

export default getTraineeDetails;