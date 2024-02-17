import express,{Request,Response} from 'express';
import userTable from '../models/users'
const app =express();
app.use(express.json());
const getUsers = async (req:Request,res:Response) => {
    try{
        const{userid,email,password,role} = req.body;
        const user = await userTable.findOne({where:{user_id:userid}})
        if(user == null){
            return res.json('No User Found');
        }
        else{
            if(password){
                await user.update({password:password});
            }
            else if(email){
                await user.update({email:email});
            }
            else if(role){
                await user.update({role_id:role});
            }
            
        }
    
    }catch(err){
        return res.json(err);
    }
}

export default getUsers;