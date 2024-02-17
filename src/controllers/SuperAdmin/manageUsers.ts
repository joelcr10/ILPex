import express,{Request,Response} from 'express';
import userTable from '../../models/users';
import bcrypt from 'bcrypt'
const app =express();
app.use(express.json());
//...............................API to Manage Users...................................//
const getUsers = async (req:Request,res:Response) => {
    try{
        const{userid,email,password,role,name} = req.body;
        const user = await userTable.findOne({where:{user_id:userid}})
        if(user == null){
            return res.json('No User Found');
        }
        else{
            //..............Update Password..............//
            if(password){
                const hashedPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
                await user.update({password:hashedPassword});
                return res.status(200).json('Password Updated');
            }
            //..............Update E-mail..............//
            else if(email){
                await user.update({email:email});
                return res.status(200).json('e-mail Updated');
            }
            //..............Update Role..............//
            else if(role){
                await user.update({role_id:role});
                return res.status(200).json('Role Updated');
            }
            //..............Update Name..............//
            else if(name){
                await user.update({user_name:name});
                return res.status(200).json('Name Updated');
            }
            
        }
    
    }catch(err){
        return res.status(404).json(err);
    }
}
export default getUsers;