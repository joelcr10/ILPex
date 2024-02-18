import express,{Express, NextFunction, Request, Response } from 'express';
import sequelize from './config/sequelize-config';
import traineeRoutes from './routes/traineeRoutes';
import authenticationRoute from './routes/authenticationRoute';
import lAndDRoutes from './routes/lAndDRoutes';
import superAdminRoutes from './routes/superAdminRoutes';

const app:Express = express();
const PORT = process.env.PORT;

sequelize.sync({force:false})
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

app.use(express.json());
app.use('/api/v1',authenticationRoute);
app.use('/api/v2',traineeRoutes);
app.use('/api/v5',lAndDRoutes);
app.use('/api/v3', superAdminRoutes);
app.use('/api/v4',lAndDRoutes);
app.listen(PORT, () => console.log(`listening to port ${PORT}...`));


