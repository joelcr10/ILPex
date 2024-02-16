import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import AssessmentsBatchesMapping from '../../types/modelTypes/assessments_batches_mapping';

AssessmentsBatchesMapping.init({
    batches_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
   assessment_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName:"assessments_batches-mapping",
    tableName:"assessments_batches-mapping"
})