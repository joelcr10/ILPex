import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Roles from "./roles";
import Users from "./users";
import SuperAdmin from "./superadmin";
import Trainees from "../../types/modelTypes/trainees";
import Batches from "./batches";


Trainees.init({
    trainee_id:{
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
    batch_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: Batches, 
         key: 'batch_id', 
    },
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
        type: DataTypes.STRING,
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
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: SuperAdmin, 
         key: 'superadmin_id',
        },
    },
    modified_by:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: SuperAdmin, 
         key: 'superadmin_id',
        },
    },
},{
    sequelize,
    modelName:'Trainee',
    tableName:'Trainee'
});

export default Trainees;