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


            if (!trainee) {
              return null;
            }

            const { user_name, email, percipio_email, role_id, Trainee } = trainee.toJSON();
            
            const traineeDetails = {
              user_name,
              email,
              percipio_email,
              role_id,
              trainee_id: null,
              batch_id: null,
              isActive: null,
              batch_name: null,
            };


            if (Trainee) {
              const { trainee_id, batch_id, isActive, Batch } = Trainee!;
              traineeDetails.trainee_id = trainee_id;
              traineeDetails.batch_id = batch_id;
              traineeDetails.isActive = isActive;
          
              // If trainee has associated Batch details
              if (Batch) {
                traineeDetails.batch_name = Batch.batch_name;
              }
            }

           return  traineeDetails;
}

export default getTraineeDetails;