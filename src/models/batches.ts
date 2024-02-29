import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Batches from '../../types/modelTypes/batches';
import moment from 'moment';
Batches.init({
    batch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique:true,
      autoIncrement: true,
      allowNull: false,
    },
    batch_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    updatedBy:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    updatedAt:{
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
    }
  }
  ,{
    sequelize: sequelize,
      modelName: 'batches',
      tableName: 'batches',
      timestamps:false,
      
  });

  

  export default Batches ;
   