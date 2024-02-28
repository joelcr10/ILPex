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
    useUTC:false,
    ssl: {
      require: true,
      rejectUnauthorized: true, 
    },
    typeCast : function(field : any, next : any) {
      if(field.type == 'DATE' || field.type == 'TIMESTAMP') {
        return new Date(field.string() + 'Z')
      }
      return next();
    }
  },
  // timezone : '+05:30'
});

export default sequelize;