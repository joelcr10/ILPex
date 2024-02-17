import sequelize from "../config/sequelize-config";
import { Sequelize, DataTypes } from "sequelize";
import Courses from "../../types/modelTypes/courses";


Courses.init(
    {
        course_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        course_duration:{
            type: DataTypes.STRING,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    },
    {
        sequelize: sequelize,
        modelName: 'courses',
        tableName: 'courses',
    }
)


export default Courses;