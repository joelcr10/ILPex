import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Batches from '../../types/modelTypes/batches';

Batches.init({
    batch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique:true,
      autoIncrement: true,
      allowNull: false,
    },
    batch_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    current_day:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    modifiedBy:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }
  ,{
    sequelize: sequelize,
      modelName: 'batches',
      tableName: 'batches',
      
  });

  

  export default Batches ;
   