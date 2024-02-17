import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import assessments from '../../types/modelTypes/assessments';
import Batches from './batches';
import Users from './users';

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
  batch_id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
      model:Batches,
      key:'batch_id',
    },
  },
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references: {
      model:Users,
      key:'user_id',
    },
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
createdBy: {
  type: DataTypes.INTEGER,
  allowNull: true,
},
createdAt:{
  type : DataTypes.DATE,
  allowNull : false,
  defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
},
updatedBy:{
  type:DataTypes.INTEGER,
  allowNull:true,
},
updatedAt:{
  type : DataTypes.DATE,
  allowNull : false,
  defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
}
},{
  sequelize,
  modelName: 'assessments',
  tableName: 'assessments',
});

Batches.hasMany(assessments,{foreignKey: 'batch_id'});
Users.hasMany(assessments,{foreignKey:'user_id'});

export default assessments ;
