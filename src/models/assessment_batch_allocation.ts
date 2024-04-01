import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Batches from './batches';
import Assessments from '../models/assessments';
import Assessment_Batch_Allocation from '../../types/modelTypes/assessment_batch_allocation';
import moment from 'moment';
Assessment_Batch_Allocation.init({
    assessment_batch_allocation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
        type : DataTypes.BOOLEAN,
        allowNull : false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      }
},{
    sequelize : sequelize,
    modelName : 'assessment_batch_allocation',
    tableName : 'assessment_batch_allocation',
});

Assessment_Batch_Allocation.belongsTo(Assessments, {foreignKey : 'assessment_id'});
Assessment_Batch_Allocation.hasMany(Batches, {foreignKey : 'batch_id'});

export default Assessment_Batch_Allocation;