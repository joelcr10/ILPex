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
        defaultValue: moment(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
        get: function () {
          var isoDateString = new Date(this.getDataValue("createdAt"));
          return new Date(
            isoDateString.getTime() -
              isoDateString.getTimezoneOffset() * 60 * 1000
          );
        },
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
    },
 },{
    sequelize,
    modelName:'roles',
    tableName:'roles',
 });

 export default Roles;