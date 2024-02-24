import Batches from "../../models/batches";
import Trainees from "../../models/trainees";
import Users from "../../models/users";



const getAllTraineesServices=async(
            offset: number,
            sortKey: string ,
            sortOrder: string 
        )=>{
            const trainees=await Trainees.findAll(
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
                       attributes: ['user_name']
                  },
                  ], 
                    order: [[sortKey, sortOrder]],
                    offset: offset,
                    limit: 5,
                    attributes:['trainee_id','user_id','batch_id'],
                }
            );

           return  trainees;
}

export default getAllTraineesServices;