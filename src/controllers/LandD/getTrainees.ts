import { Op,Sequelize } from "sequelize";
import {Router, Request, Response} from "express";
import Batches from '../../models/batches';
import Trainees from "../../models/trainees";

const getTrainees=async(req:Request,res:Response):Promise<
Response<
  any,
  Record<string,| { message: string }> 
>>=>{
    try{
        const offset: number = parseInt(req.query.offset as string) || 0;
        const sortKey: string = req.query.sortKey as string; 
        const sortOrder: string = req.query.sortOrder as string === '-1' ? 'DESC' : 'ASC';

        const searchQuery = {
            [Op.or]: [
              { user_id: { [Op.like]: `%${req.query.search}%` } },
              { batch_id: { [Op.like]: `%${req.query.search}%` } },
            ],
          };
          
          Trainees.belongsTo(Batches,{ foreignKey: 'batch_id',targetKey: 'batch_id'});

            const trainees=await Trainees.findAll(
                {
                    include:{
                        model:Batches,
                        required:true,
                         attributes: ['batch_name']
                    },

                    where:searchQuery,
                    order: [[sortKey, sortOrder]],
                    offset: offset,
                    limit: 5,
                    attributes:['trainee_id','user_id','batch_id'],
                }
            );

            if(trainees==null){
                return res.json({message:"no result found"});
            }
            return res.status(200).json(trainees);
    }
    catch(err){
            return res.status(500).json({message:err})
    }

}



export default getTrainees;
