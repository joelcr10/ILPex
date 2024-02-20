import sequelize from "../config/sequelize-config";
import { Sequelize, DataTypes } from "sequelize";
import Course_Type from "../../types/modelTypes/course_type";


Course_Type.init({
    course_type_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
        allowNull: false
    },
    course_type : {
        type : DataTypes.STRING,
        allowNull : false,
    }
},{
    sequelize: sequelize,
    modelName: 'course_type',
    tableName: 'course_type',
});

export default Course_Type; 