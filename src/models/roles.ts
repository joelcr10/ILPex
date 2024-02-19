 import Roles from '../../types/modelTypes/roles';
 import sequelize from '../config/sequelize-config';
 import { DataTypes, Sequelize } from 'sequelize';


 Roles.init({
    role_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        unique : true,
    },
    role_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
 },{
    sequelize,
    modelName:'roles',
    tableName:'roles',
 });

 export default Roles;