import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Trainee_Progress from "../../types/modelTypes/trainee_progress";
import Trainees from "./trainees";
import Users from "./users";
import moment from 'moment';
import Courses from "./courses";
import Batches from "./batches";

Trainee_Progress.init({
    progress_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
        allowNull: false
    },
    trainee_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: Trainees,
            key: 'trainee_id',
        },
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Courses,
            key : 'course_id'
        },
    },

    batch_id:{
        type: DataTypes.INTEGER,
        allowNull: false,        //Not to be given true
        references:{
            model: Batches,
            key: 'batch_id'
        }
    },
    
    day_number:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    completion_status : {
        type: DataTypes.ENUM('ONGOING', 'COMPLETED'),
        allowNull : false,
    },

    duration:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    estimated_duration:{
        type: DataTypes.INTEGER,
        allowNull: true,
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
    sequelize: sequelize,
    modelName: 'trainee_progress',
    tableName: 'trainee_progress',
});


Trainee_Progress.belongsTo(Trainees, {foreignKey: 'trainee_id'});
Trainee_Progress.belongsTo(Courses, {foreignKey: 'course_id'});
Trainee_Progress.hasMany(Batches, {foreignKey: 'batch_id'});

export default Trainee_Progress;