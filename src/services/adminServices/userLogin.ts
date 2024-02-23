import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../models/users";
import dotenv from "dotenv";

dotenv.config();

const { JWTTOKENCODE } = process.env as { JWTTOKENCODE: string | undefined };

const userLogin = async (
  req: Request,
  res: Response
): Promise<
  Response<
    any,
    Record<
      string,
      | { message: string }
      | { token: string; client_type: "string"; registration_id: string }
    >
  >
> => {
  const { email, password } = req.body;
  const userFound = await Users.findOne({
    where: { email: email },
  });
  if (userFound) {
    if (userFound?.role_id == 101) {
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "24h" }
          );
          return res.status(200).json({
            message: `SuperAdmin logged in!`,
            token: ` ${token}`,
            userid: `${userFound.user_id}`,
          });
        } else {
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
        }
      } else {
        return res.status(404).json({ error: `Incorrect password` });
      }
    }
    if (userFound?.role_id == 102) {
      const userFound = await Users.findOne({
        where: { email: email },
      });
      if (userFound && bcrypt.compareSync(password, userFound.password)) {

        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "24h" }
          );
          return res.status(200).json({
          message: `l_and_d logged in!`,
          token: ` ${token}`,
          userid: `${userFound.user_id}`,
          });
        } else {
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
        }
      } else {
        return res.status(404).json({ error: `Incorrect password` });
      }
    }
    if (userFound?.role_id == 103) {
      const userFound = await Users.findOne({
        where: { email: email },
      });
      if (userFound && bcrypt.compareSync(password, userFound.password)) {

        if (JWTTOKENCODE && userFound?.user_id && userFound?.role_id) {
          const token = jwt.sign(
            { user_reg_id: userFound?.user_id, usertype: userFound?.role_id },
            JWTTOKENCODE,
            { expiresIn: "24h" }
          );
          return res.status(200).json({
          message: `Trainee logged in! `,
          token: ` ${token}`,
          userid: `${userFound.user_id}`,
        });
        } else {
          console.error(
            "Unable to sign the token. Check if JWTTOKENCODE and userFound are defined."
          );
        }
        
      } else {
        return res.status(404).json({ error: `Incorrect password` });
      }
    }
  }

  return res.status(404).json("No such usertype found");
};

export default userLogin;
