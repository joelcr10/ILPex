import express,{Request,Response} from 'express';
import userstable from '../../models/users';
const app =express();
app.use(express.json());
//......................................Users List API........................................//
const getUsers = async (req:Request,res:Response) => {
    try{
    const names = await userstable.findAll({attributes:['user_name','user_id']})
    return res.json(names);
    }catch(err){
        return res.json(err);
    }
}
export default getUsers;