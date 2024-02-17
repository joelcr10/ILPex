import express,{Router,Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import Roles from "../../models/roles";
import SuperAdmin from "../../models/superadmin";
import LnD from "../../models/lnd";
import Trainees from "../../models/trainees";

const userRegistration = async(req:Request,res:Response)=>{
    try{
        const {email, user_name, password, role_id,created_by_role_id}= req.body;
        if (!email || !user_name || !password || !role_id ||!created_by_role_id) {
            return res.status(404).json({ error: 'All fields are required' });
          }

        const role_name = await Roles.findOne({where:{role_id:created_by_role_id}});

        if (created_by_role_id!== role_name?.role_id) {
            return res.status(404).json({ error: 'Only admin can create users' });
        }

        const existingUser = await Users.findOne({where: {email: email}});
        if(existingUser?.email===email){
            return res.status(404).json({error: 'This user already exists'});
        }
       
        else{

            const newUser = await Users.create({
                email:email,
                user_name:user_name,
                password:password,
                role_id:role_id,    
            });

            if(role_id==101){

                const registerSuperAdmin = await SuperAdmin.create({

                    user_id:newUser.user_id,
                    name:user_name,
                    role:role_name,
                    isActive:true,

                    
                });

                return res.status(200).json({message: `new user created. userid is ${newUser.user_id}.}`, notification:` superadmin id : ${registerSuperAdmin.superadmin_id}`});

            }
            if(role_id==102){

                const registerLnD = await LnD.create({

                    user_id:newUser.user_id,
                    name:user_name,
                    isActive:true,
                    
                });

                return res.status(200).json({message:`new user created. userid is ${newUser.user_id}.`, notification:` LnD id : ${registerLnD.l_and_d_Id}`});

            }

        }

    } catch(err){
        console.log("error caught :",err);
        return res.status(200).send("error");
    }
};

export default userRegistration;