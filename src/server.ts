import express, {Express, NextFunction,  Request, Response} from 'express';
import sequelize from './config/sequelize-config.ts';

const app : Express = express();
const PORT = 3000;

sequelize
.sync({ force: false })
	.then(() => {
		console.log("Database Synced");
	})
	.catch((error : any) => {
		console.error("Error syncing Database", error);
});