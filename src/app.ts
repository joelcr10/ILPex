import express, { Express } from "express";
import traineeRoutes from "./routes/traineeRoutes";
import authenticationRoute from "./routes/authenticationRoute";
import lAndDRoutes from "./routes/l_and_d_routes";
import superAdminRoutes from "./routes/superAdminRoutes";
import superAdminRegistrationRoutes from "./routes/superAdminRegistrationRoutes";
import cors, { CorsOptions } from 'cors';

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200'] // Array of whitelisted origins
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/v1", authenticationRoute);
app.use("/api/v2",superAdminRoutes);
app.use("/api/v2",lAndDRoutes);
app.use("/api/v3",traineeRoutes);



export default app;