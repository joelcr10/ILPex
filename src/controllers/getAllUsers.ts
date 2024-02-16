import express,{Request,Response} from 'express';
import LandDtable from '../models/l&d'
import BatchTable from '../models/batchTable';
const app =express();
app.use(express.json());

const getUsers = async (req:Request,res:Response) => {
    try{
    const names = await LandDtable.findAll({attributes:['name','role']})
    const batches = await BatchTable.findAll({attributes:['name','role']})
    const landdnames = names.map(users=>({name:users.name,role:users.role}));
    const batchnames = batches.map(users=>({name:users.name,role:users.role}));
    const responseData ={
        landdnames:landdnames,
        batchnames:batchnames
    }
    return res.json(responseData);
    

        // return res.json(names.map(users=>users.name)) 
    // const respondData = {
    //     landdnames:names.map(users=>{users.name,users.role}),
    //     batchnames:batches.map(users=>{users.name,users.role})
    // }
    // return res.json(respondData);
    }catch(err){
        return res.json(err);
    }
}

export default getUsers;