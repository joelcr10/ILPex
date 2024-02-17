 import Roles from "../../types/modelTypes/roles";
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
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

 },{
    sequelize,
    modelName:'Roles',
    tableName:'Roles',
 });

 export default Roles;