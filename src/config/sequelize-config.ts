// import { Sequelize } from 'sequelize';
// import {config} from 'dotenv';
// config({path:".env"});

// const sequelize = new Sequelize({
//   database: 'ilpex',
//   username: 'root',
//   password: process.env.DATABASE_CONNECT_PASSWORD??"experion@123",
//   host: '127.0.0.1',
//   dialect: 'mysql',
// });

// export default sequelize;

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
  throw new Error('Please provide values for PGHOST, PGDATABASE, PGUSER, and PGPASSWORD in the .env file.');
}

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true, // Change to true in production
    },
  },
});

export default sequelize;