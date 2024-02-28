import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import Questions from '../../types/modelTypes/questions';
import Assessment from '../models/assessments';
import moment from 'moment';

Questions.init({
    question_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
        allowNull: false,
    },
    assessment_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Assessment, 
            key: 'assessment_id', 
       }
    },
    question :{
        type: DataTypes.STRING,
        allowNull:false
    },
    option_a:{
        type: DataTypes.STRING,
        allowNull:false
    },
    option_b:{
        type: DataTypes.STRING,
        allowNull:false
    },
    option_c:{
        type: DataTypes.STRING,
        allowNull:false
    },
    option_d:{
        type: DataTypes.STRING,
        allowNull:false
    },
    correct_answer:{
        type: DataTypes.STRING,
        allowNull:false
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
    },
},{
    sequelize,
    modelName:"questions",
    tableName:"questions"
});

export default Questions;