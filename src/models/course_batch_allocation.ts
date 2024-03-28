import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Batches from './batches';
import Course_Batch_Allocation from '../../types/modelTypes/course_batch_allocation';
import moment from 'moment';
import Course_Set from './course_set';

Course_Batch_Allocation.init({
    course_batch_allocation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      course_set_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Course_Set,
            key : 'course_set_id'
        }
      },
      batch_id : {
        type : DataTypes.INTEGER,
        allowNull : false, 
        references : {
            model : Batches,
            key : 'batch_id'
        }
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
      }
},{
    sequelize : sequelize,
    modelName : 'course_batch_allocation',
    tableName : 'course_batch_allocation',
});

Course_Batch_Allocation.belongsTo(Course_Set, {foreignKey : 'course_set_id'});
Course_Batch_Allocation.hasMany(Batches, {foreignKey : 'batch_id'});

export default Course_Batch_Allocation;