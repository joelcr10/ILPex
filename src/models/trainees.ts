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
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: moment(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
        get: function () {
          var isoDateString = new Date(this.getDataValue("createdAt"));
          return new Date(
            isoDateString.getTime() -
              isoDateString.getTimezoneOffset() * 60 * 1000
          );
        },
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: moment(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
        get: function () {
          var isoDateString = new Date(this.getDataValue("updatedAt"));
          return new Date(
            isoDateString.getTime() -
              isoDateString.getTimezoneOffset() * 60 * 1000
          );
        },
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