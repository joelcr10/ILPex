import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Batches from './batches';
import Users from './users';
import Assessments from '../../types/modelTypes/assessments';
import Assessment_Batch_Allocation from '../../types/modelTypes/assessment_batch_allocation';

Assessment_Batch_Allocation.init({
    assessment_batch_allocation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique : true,
        autoIncrement: true,
        allowNull: false,
      },
      assessment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Assessments,
            key : 'assessment_id'
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
      start_date : {
        type : DataTypes.DATE,
        allowNull : false,
      },
      end_date : {
        type : DataTypes.DATE,
        allowNull : false,
      },
      assessment_status : {
        type : DataTypes.DATE,
        allowNull : false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model:Users,
          key:'user_id',
        },
      },
      createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal("CONVERT_TZ(CURRENT_TIMESTAMP(), 'UTC', '+05:30')")
      },
      updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal("CONVERT_TZ(CURRENT_TIMESTAMP(), 'UTC', '+05:30')")
      }
},{
    sequelize : sequelize,
    modelName : 'assessment_batch_allocation',
    tableName : 'assessment_batch_allocation',
});

Assessment_Batch_Allocation.hasMany(Assessments, {foreignKey : 'assessment_Id'});
Assessment_Batch_Allocation.hasMany(Batches, {foreignKey : 'batch_id'});

export default Assessment_Batch_Allocation;