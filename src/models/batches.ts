import { DataTypes,Sequelize} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Batches from '../../types/modelTypes/batches';

Batches.init({
    batch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    created_by:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    created_on:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    modified_by:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    modified_on:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }
  ,{
    sequelize: sequelize,
      modelName: 'batches',
      tableName: 'batches',
      
  });

  export default Batches ;
   