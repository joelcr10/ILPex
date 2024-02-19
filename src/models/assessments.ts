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
  assessment_date: {
    type: DataTypes.DATE,
    allowNull: false,
},
batch_id : {
  type : DataTypes.INTEGER,
  allowNull : false,
  references : {
    model : Batches,
    key : 'batch_id',
  }
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

Users.hasMany(Assessments,{foreignKey:'user_id'});
Users.belongsTo(Batches, {foreignKey : 'batch_id'});
export default Assessments ;
