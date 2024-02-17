import express,{Request,Response} from 'express';
import LandDtable from '../models/lnd'
import BatchTable from '../models/trainees';
const app =express();
app.use(express.json());
const getUsers = async (req:Request,res:Response) => {
    try{
    const names = await LandDtable.findAll({attributes:['name','user_id']})
    const batches = await BatchTable.findAll({attributes:['name','user_id']})
    const landdnames = names.map(users=>({name:users.name,id:users.user_id}));
    const batchnames = batches.map(users=>({name:users.name,id:users.user_id}));
    const responseData ={
        landdnames:landdnames,
        batchnames:batchnames
    }
    return res.json(responseData);
    }catch(err){
        return res.json(err);
    }
}

export default getUsers;