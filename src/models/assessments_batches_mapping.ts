import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; 
import assessments_batches_mapping from '../../types/modelTypes/assessments_batches_mapping';
import Batches from './batches';
import assessments from './assessments';

assessments_batches_mapping.init({
    batch_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Batches, 
            key: 'batch_id', 
       },
    },
   assessment_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: assessments, 
            key: 'assessment_id', 
       },
       
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
},{
    sequelize,
    modelName:"assessments_batches_mapping",
    tableName:"assessments_batches_mapping"
});

assessments_batches_mapping.belongsTo(Batches, { foreignKey : 'batch_id'});
assessments_batches_mapping.belongsTo(assessments, { foreignKey : 'assessment_id'});


export default assessments_batches_mapping;