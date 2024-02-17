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
    },
    isActive:{
        type: DataTypes.STRING,
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

},{
    sequelize,
    modelName:'Trainee',
    tableName:'Trainee'
});

Trainees.belongsTo(Users, { foreignKey : 'user_id' });
Trainees.belongsTo(Batches, { foreignKey : 'batch_id'});


export default Trainees;