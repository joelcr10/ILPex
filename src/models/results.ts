import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import Results from '../../types/modelTypes/results';
import Trainees from './trainees';
import Assessment_Batch_Allocation from './assessment_batch_allocation';
import moment from 'moment';

Results.init({
    result_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
        allowNull: false,
    },
    assessment_batches_allocation_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Assessment_Batch_Allocation,
            key : 'assessment_batch_allocation_id'
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
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
},{
    sequelize : sequelize,
    modelName: 'results',
    tableName: 'results',
});

Assessment_Batch_Allocation.belongsTo(Results, {foreignKey : 'assessment_batch_allocation_id'});
Results.belongsTo(Trainees, {foreignKey : 'trainee_id'});

export default Results;