import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Users from "./users";
import Trainees from "../../types/modelTypes/trainees";
import Batches from "./batches";
import moment from 'moment';

Trainees.init({
    trainee_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique : true,
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
    current_day : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue: 1,
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
},{
    sequelize,
    modelName:'trainee',
    tableName:'trainee'
});

Users.hasOne(Trainees, { foreignKey: 'user_id'});
Trainees.belongsTo(Users, { foreignKey : 'user_id' });
Trainees.belongsTo(Batches, { foreignKey : 'batch_id'});



export default Trainees;