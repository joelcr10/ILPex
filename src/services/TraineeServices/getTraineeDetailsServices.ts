import Batches from "../../models/batches";
import Trainees from "../../models/trainees";
import Users from "../../models/users";



const getTraineeDetails=async(user_id:number)=>{
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
                      where:{user_id:user_id},
                       attributes: ['user_name','email','percipio_email','role_id']
                  },
                  ], 
                    attributes:['trainee_id','user_id','batch_id','isActive'],
                }
            );

            

           return  trainee;
}

export default getTraineeDetails;