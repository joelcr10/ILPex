import express,{Router,Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import SuperAdmin from "../../models/superadmin";
import Roles from "../../models/roles";

const userRegistration = async(req:Request,res:Response)=>{
    try{
        const {email, user_name, password, role_id}= req.body;
        if (!email || !user_name || !password || !role_id ) {
            return res.status(400).json({ error: 'All fields are required' });
          }

        //   if (created_by_role_id!== 101) {
        //     return res.status(403).json({ error: 'Only admin can create users' });
        // }
        const role_name = await Roles.findOne({where:{role_id:role_id}});

        const existingUser = await Users.findOne({where: {email: email}});
        if(existingUser?.email===email){
            return res.status(403).json({error: 'This user already exists'});
        }
       
        else{
            const newUser = await Users.create({
                email:email,
                user_name:user_name,
                password:password,
                role_id:role_id,    
            });

            return res.send(`new user created. userid is ${newUser.user_id}. `);
        }

    } catch(err){
        console.log("error caught :",err);
        return res.status(200).send("error");
    }
};

export default userRegistration;