import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import Results from '../../types/modelTypes/results';
import Assessment from './assessments';
import Trainees from './trainees';

Results.init({
    result_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
        allowNull: false,
    },
    assessment_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Assessment,
            key : 'assessment_id'
        }
    },
    trainee_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Trainees,
            key : 'trainee_id',
        }
    },
    first_score : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0,
    },
    high_score : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0,
    },
    assessment_attempts : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
},{
    sequelize : sequelize,
    modelName: 'results',
    tableName: 'results',
});

Results.belongsTo(Assessment, {foreignKey : 'assessment_id'});
Results.belongsTo(Trainees, {foreignKey : 'trainee_id'});

export default Results;