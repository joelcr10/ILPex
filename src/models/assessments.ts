import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import assessments from '../../types/modelTypes/assessments';

assessments.init({
  assessment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  created_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modified_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
},{
  sequelize,
  modelName: 'assessments',
  tableName: 'assessments',
});

export default assessments ;
