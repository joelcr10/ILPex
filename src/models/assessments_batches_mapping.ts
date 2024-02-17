import { BelongsToMany, DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import assessments_batches_mapping from '../../types/modelTypes/assessments_batches_mapping';
import Batches from '../models/batches';
import assessments from '../models/assessments';

assessments_batches_mapping.init({

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
    modelName:"assessments_batches-mapping",
    tableName:"assessments_batches-mapping"
});


assessments.belongsToMany(Batches,{through:assessments_batches_mapping});
Batches.belongsToMany(assessments,{through:assessments_batches_mapping});

assessments_batches_mapping.belongsTo(assessments);
assessments_batches_mapping.belongsTo(Batches);


export default assessments_batches_mapping;