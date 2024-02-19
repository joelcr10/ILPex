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
},{
    sequelize,
    modelName:"questions",
    tableName:"questions"
});

export default Questions;