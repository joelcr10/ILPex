import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import moment from 'moment';
import Trainees from './trainees';
import Courses from './courses';
import Percipio_Assessment from '../../types/modelTypes/percipio_assessment';
import Batches from './batches';

Percipio_Assessment.init({

  percipio_assessment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique : true,
    autoIncrement: true,
    allowNull: false,
  },
  
  trainee_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model:Trainees,
        key:'trainee_id',
    },

  },

  batch_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: Batches,
      key: "batch_id",
    }
  },

  course_id:{
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
        model: Courses,
        key: 'course_id',
    }
  },

  day_number:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  first_score:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  
  high_score:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  
  last_score:{
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
  sequelize,
  modelName: 'percipio_assessment',
  tableName: 'percipio_assessment',
});


Percipio_Assessment.belongsTo(Trainees, {foreignKey: 'trainee_id'});
Percipio_Assessment.belongsTo(Courses, {foreignKey: 'course_id'});
Percipio_Assessment.belongsTo(Batches,{foreignKey: 'batch_id'});


export default Percipio_Assessment;
