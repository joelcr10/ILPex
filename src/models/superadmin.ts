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
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: Users, 
         key: 'user_id', 
    }
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
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
    created_on:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    modified_on:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }

},{
    sequelize,
    modelName:'SuperAdmin',
    tableName:'SuperAdmin',
});

export default SuperAdmin;