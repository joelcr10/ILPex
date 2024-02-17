import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import Questions from '../../types/modelTypes/questions';
import assessment from '../models/assessments';

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
            model: assessment, 
            key: 'assessment_id', 
       }
    },
    questions_text:{
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
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull: false,

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
    modelName:"questions",
    tableName:"questions"
});

export default Questions;