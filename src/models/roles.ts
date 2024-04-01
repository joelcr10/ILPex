import Roles from '../../types/modelTypes/roles';
import sequelize from '../config/sequelize-config';
import { DataTypes } from 'sequelize';
import moment from 'moment';

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
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
 },{
    sequelize,
    modelName:'roles',
    tableName:'roles',
 });

 export default Roles;