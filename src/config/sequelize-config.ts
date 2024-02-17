import { Sequelize } from 'sequelize';
import {config} from 'dotenv';
config({path:".env"});

const sequelize = new Sequelize({
  database: 'ilpex',
  username: 'root',
  password: process.env.DATABASE_CONNECT_PASSWORD??"experion@123",
  host: '127.0.0.1',
  dialect: 'mysql',
});

export default sequelize;