import sequelize from '../config/sequelize-config';
import { DataTypes, Sequelize } from 'sequelize';
import Users from '../../types/modelTypes/Users';
import bcrypt from "bcrypt";

Users.init({
     user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
     },
     username:{
        type: DataTypes.STRING,
        allowNull:false,
     },
     email:{
        type: DataTypes.STRING,
        allowNull:false,
     },
     password:{
        type: DataTypes.STRING,
        allowNull:false,
     },
     role_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        
     },

},{
    sequelize
})