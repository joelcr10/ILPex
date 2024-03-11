import express, { Express } from "express";
import traineeRoutes from "./routes/traineeRoutes";
import authenticationRoute from "./routes/authenticationRoute";
import lAndDRoutes from "./routes/l_and_d_routes";
import superAdminRoutes from "./routes/superAdminRoutes";
import superAdminRegistrationRoutes from "./routes/superAdminRegistrationRoutes";

const app: Express = express();

app.use(express.json());
app.use("/api/v0", superAdminRegistrationRoutes);
app.use("/api/v1", authenticationRoute);
app.use("/api/v2",superAdminRoutes);
app.use("/api/v2",lAndDRoutes);
app.use("/api/v3",traineeRoutes);



export default app;