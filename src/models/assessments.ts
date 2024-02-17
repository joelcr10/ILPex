import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import assessments from '../../types/modelTypes/assessments';
import Batches from './batches';

assessments.init({
  assessment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique : true,
    autoIncrement: true,
    allowNull: false,
  },
  assessment_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assessment_date: {
    type: DataTypes.DATE,
    allowNull: false,
},
  no_of_attempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0,
},
  createdAt:{
    type : DataTypes.DATE,
    allowNull : false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedAt:{
    type : DataTypes.DATE,
    allowNull : false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  modifiedBy:{
    type:DataTypes.INTEGER,
    allowNull:true,
  },
},{
  sequelize,
  modelName: 'assessments',
  tableName: 'assessments',
});

export default assessments ;
