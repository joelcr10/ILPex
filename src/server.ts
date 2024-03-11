import express, { Express, NextFunction, Request, Response } from "express";
import sequelize from "./config/sequelize-config";
import traineeRoutes from "./routes/traineeRoutes";
import authenticationRoute from "./routes/authenticationRoute";
import lAndDRoutes from "./routes/l_and_d_routes";
import superAdminRoutes from "./routes/superAdminRoutes";
import superAdminRegistrationRoutes from "./routes/superAdminRegistrationRoutes";
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import app from "./app";
// const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5432;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

// app.use(express.json());
// app.use("/api/v0", superAdminRegistrationRoutes);
// app.use("/api/v1", authenticationRoute);
// app.use("/api/v2",superAdminRoutes);
// app.use("/api/v2",lAndDRoutes);
// app.use("/api/v3",traineeRoutes);
app.listen(PORT, () => console.log(`Listening!...`));
