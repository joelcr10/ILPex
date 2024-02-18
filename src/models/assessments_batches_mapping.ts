import { BelongsToMany, DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import Assessments_Batches_Mapping from '../../types/modelTypes/assessments_batches_mapping';
import Batches from '../models/batches';
import assessments from '../models/assessments';

Assessments_Batches_Mapping.init({

    assessments_batches_mapping_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement:true,
        allowNull:false,
    },

    batch_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique : true,
        references: {
            model: Batches, 
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
    modelName:"assessments_batches_mapping",
    tableName:"assessments_batches_mapping"
});


assessments.belongsToMany(Batches,{through:Assessments_Batches_Mapping});
Batches.belongsToMany(assessments,{through:Assessments_Batches_Mapping});

Assessments_Batches_Mapping.belongsTo(assessments);
Assessments_Batches_Mapping.belongsTo(Batches);


export default Assessments_Batches_Mapping;