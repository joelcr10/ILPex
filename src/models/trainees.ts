import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Roles from "./roles";
import Users from "./users";
import SuperAdmin from "./superadmin";
import Trainees from "../../types/modelTypes/trainees";
import Batches from "./batches";
import Days from "./daysModel";


Trainees.init({
    trainee_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique : true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    //     references: {
    //      model: Users, 
    //      key: 'user_id', 
    // }
    },
    batch_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: Batches, 
         key: 'batch_id', 
        },
    },
    day_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: Days,
            key: 'day_id',
        }
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
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
    modelName:'trainee',
    tableName:'trainee'
});

Trainees.belongsTo(Users, { foreignKey : 'user_id' });
Trainees.belongsTo(Batches, { foreignKey : 'batch_id'});

Trainees.hasOne(Days, {foreignKey: 'day_id'});
Days.belongsTo(Trainees,{foreignKey: 'day_id'});


export default Trainees;