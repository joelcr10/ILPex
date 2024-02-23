import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import Roles from "../../models/roles";
// import SuperAdmin from "../../models/superadmin";
// import l_and_d from "../../models/l_and_d";

const userRegistration = async (req: Request, res: Response) => {
  try {
    const { email, user_name, password, role_id, jwt_decoded } = req.body;
    if (!email || !user_name || !password || !role_id) {
      return res.status(404).json({ error: "All fields are required" });
    }

    console.log(jwt_decoded.usertype);

    // no need for this check
    const role_name = await Roles.findOne({
      where: { role_id: jwt_decoded.usertype },
    });

    if (role_name?.role_id !== 101) {
      return res.status(404).json({ error: "Only admin can create users" });
    }

    if(role_id==103){
      return res.status(404).json({ error: "Trainee can be created only after batch creation" });

    }

    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser?.email === email) {
      return res.status(404).json({ error: "This user already exists" });
    } 
    
    
    else {
      const newUser = await Users.create({
        email: email,
        user_name: user_name,
        password: password,
        role_id: role_id,
      });

      if (role_id == 101) {
        return res.status(404).json({ error: "Invalid Role ID" });
      }

      if (role_id == 102) {
        // const registerLnD = await l_and_d.create({
        //   user_id: newUser.user_id,
        //   name: user_name,
        //   isActive: true,
        // });

        return res.status(200).json({
          message: `new user created. userid is ${newUser.user_id}.`,
          // notification: ` l_and_d id : ${registerLnD.l_and_d_Id}`,
        });
      } else {
        return res.status(404).json({ error: "Invalid Role ID" });
      }
    }
  } catch (err) {
    console.log("error caught :", err);
    return res.status(200).send("error");
  }
};

export default userRegistration;
