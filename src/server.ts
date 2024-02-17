import express,{Express, NextFunction, Request, Response } from 'express';
import sequelize from './config/sequelize-config';
// import { Op } from 'sequelize';
import traineeRoutes from './routes/traineeRoutes';
import authenticationRoute from './routes/authenticationRoute';
import lAnddRoute from './routes/ldRoutes';

const app:Express = express();
const PORT = 3000 || process.env.PORT;

sequelize.sync ({force:false})
.then(()=>{
    console.log('Database synced')
})
.catch((error:any)=>{
    console.error('Error syncing database :',error);
})


app.use(express.json());
app.use('/api/v1',authenticationRoute);
app.use('/api/v2',traineeRoutes);
app.use('/api/v3',lAnddRoute);
app.listen(PORT, () => console.log(`listening to port ${PORT}...`));
