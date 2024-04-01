import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Courses from "../../types/modelTypes/courses";
import moment from 'moment';
import Course_Set from "./course_set";
Courses.init(
    {
        course_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true,
            allowNull: false
        },
        course_set_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model:Course_Set,
                key:'course_set_id',
              },
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

Course_Set.hasMany(Courses,{foreignKey:'course_set_id'});

export default Courses;