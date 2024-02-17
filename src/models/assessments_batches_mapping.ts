import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import Assessments_Batches_Mapping from '../../types/modelTypes/assessments_batches_mapping';

Assessments_Batches_Mapping.init({
    batch_id : {
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
});
export default Assessments_Batches_Mapping;