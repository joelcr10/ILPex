import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Assessments from '../../types/modelTypes/assessments';
import Users from './users';
import moment from 'moment';
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
  sequelize,
  modelName: 'assessments',
  tableName: 'assessments',
});

Users.hasMany(Assessments,{foreignKey:'createdBy'});
export default Assessments ;
