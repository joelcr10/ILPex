 import Roles from "../../types/modelTypes/Roles";
 import sequelize from '../config/sequelize-config';
 import { DataTypes, Sequelize } from 'sequelize';


 Roles.init({
    role_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    role_name:{
        type:DataTypes.STRING,
        allowNull:false,
    }
 },{
    sequelize,
    modelName:'Roles',
    tableName:'Roles',
 });

 export default Roles;