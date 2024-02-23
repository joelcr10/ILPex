import sequelize from "../config/sequelize-config";
import { Sequelize, DataTypes } from "sequelize";
import Trainee_Progress from "../../types/modelTypes/trainee_progress";
import Trainees from "./trainees";
import Course_Type from "./course_type";
import Users from "./users";
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
            model : Course_Type,
            key : 'course_type_id'
        },
    },
    due_date : {
        type : DataTypes.DATE,
        allowNull : false,
    },
    completion_status : {
        type: DataTypes.ENUM('ONGOING', 'COMPLETED'),
        allowNull : false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model:Users,
        key:'user_id',
        },
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
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model:Users,
            key:'user_id',
        },
    },
},{
    sequelize: sequelize,
    modelName: 'course_type',
    tableName: 'course_type',
});


Trainee_Progress.belongsTo(Trainees, {foreignKey: 'trainee_id'});
Trainee_Progress.belongsTo(Course_Type, {foreignKey: 'course_type_id'});

export default Trainee_Progress;