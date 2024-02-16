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
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assessment_date: {
    type: DataTypes.DATE,
    allowNull: false,
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
