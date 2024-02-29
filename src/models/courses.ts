import sequelize from "../config/sequelize-config";
import { Sequelize, DataTypes } from "sequelize";
import Courses from "../../types/modelTypes/courses";
import Course_Type from "./course_type";

Courses.init(
    {
        course_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true,
            allowNull: false
        },
        day_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_type : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        course_duration:{
            type: DataTypes.STRING,
            allowNull: true
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
        
        updatedAt:{
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    },
    {
        sequelize: sequelize,
        modelName: 'courses',
        tableName: 'courses',
    }
)

// Courses.belongsTo(Course_Type, {foreignKey : 'course_type_id'});
export default Courses;