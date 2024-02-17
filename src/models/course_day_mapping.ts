//created by Joel
import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Course_Day_Mapping from "../../types/modelTypes/course_day_mapping";
import Course from "./courses.ts";
import Days from "./daysModel.ts";


Course_Day_Mapping.init(
    {
        course_day_mapping_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Course,
                key: 'course_id'
            }
        },
        day_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Days,
                key: 'day_id'
            }
        }
    },
    {
        sequelize: sequelize,
        modelName: 'course_day_mapping',
        tableName: 'course_day_mapping'
    }
)

export default Course_Day_Mapping;