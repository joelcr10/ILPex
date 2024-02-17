import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import assessments_batches_mapping from '../../types/modelTypes/assessments_batches_mapping';
import batches from '../models/batches';
import assessments from '../models/assessments';

assessments_batches_mapping.init({
    batch_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique : true,
        references: {
            model: batches, 
            key: 'batch_id', 
       }
    },
   assessment_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique : true,
        references: {
            model: assessments, 
            key: 'assessment_id', 
       }
    }
},{
    sequelize,
    modelName:"assessments_batches-mapping",
    tableName:"assessments_batches-mapping"
});
export default assessments_batches_mapping;