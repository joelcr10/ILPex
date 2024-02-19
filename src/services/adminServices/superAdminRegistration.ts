import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import Roles from "../../models/roles";

const superAdminRegistration = async (req: Request, res: Response) => {
    try {
		const { email, user_name, password, role_id } = req.body;
		if (!email || !user_name || !password || !role_id) {
			return res.status(404).json({ error: "All fields are required" });
    	}
		
		const createSuperAdminRole = await Roles.findOrCreate({ 
			where: { role_id: 101 }, 
			defaults: { 
				role_id: 101, 
				role_name: 'Super Admin' 
			}
		});

		const createLearning_And_Development_Role = await Roles.findOrCreate({ 
			where: { role_id: 102 }, 
			defaults: { 
				role_id: 102, 
				role_name: 'Learning And Development' 
			}
		});

		const createTrainneRole = await Roles.findOrCreate({ 
			where: { role_id: 103 }, 
			defaults: { 
				role_id: 103, 
				role_name: 'Trainee' 
			}
		});

		if (role_id == 101) 
		{
			const existingUser = await Users.findOne({ where: { email: email } });
			if (existingUser?.email === email) {
				return res.status(404).json({ error: "This user already exists" });
			} else {
				const newUser = await Users.create({
					email: email,
					user_name: user_name,
					password: password,
					role_id: role_id,
				});

				return res.status(200).json({
					message: `Super Admin Has Been Created Successfully!.`,
					notification: ` Super Admin ID : ${newUser.user_id}`,
				});
			}
		}
		else
		{
				return res.status(404).json({error : "Invalid Role ID For Super Admin! Role ID Should be 101"})
		}
	} catch (err) {
			console.log("Error Caught :", err);
			return res.status(200).json({error : err});
	}
};

export default superAdminRegistration;
