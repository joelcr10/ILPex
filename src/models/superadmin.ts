import sequelize from '../config/sequelize-config';
import { DataTypes, Sequelize } from 'sequelize';
import Users from '../../types/modelTypes/users';
import Roles from './roles';
import SuperAdmin from '../../types/modelTypes/superAdmin';

SuperAdmin.init({
    superadmin_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique : true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        unique : true,
        references: {
         model: Users, 
         key: 'user_id', 
    }
    },
    name:{
        type: DataTypes.STRING,
        // allowNull:false,
        references: {
         model: Users, 
         key: 'user_name', 
    },
    },
    role:{
        type: DataTypes.STRING,
        allowNull:false,
        references: {
         model: Roles, 
         key: 'role_name', 
       },

    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedBy:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },

},{
    sequelize,
    modelName:'SuperAdmin',
    tableName:'SuperAdmin',
});

SuperAdmin.belongsTo(Users, { foreignKey: "user_id" });
SuperAdmin.belongsTo(Users, { foreignKey: "user_name" });

export default SuperAdmin;