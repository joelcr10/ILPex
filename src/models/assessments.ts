import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Assessments from '../../types/modelTypes/assessments';
import Batches from './batches';
import Users from './users';

Assessments.init({
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
  defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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

Users.hasMany(Assessments,{foreignKey:'createdBy'});
export default Assessments ;
