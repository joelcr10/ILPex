import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Courses from "../../types/modelTypes/courses";
import moment from 'moment';
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
            defaultValue: moment(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
            get: function () {
              var isoDateString = new Date(this.getDataValue("createdAt"));
              return new Date(
                isoDateString.getTime() -
                  isoDateString.getTimezoneOffset() * 60 * 1000
              );
            },
        },
        
        updatedAt:{
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: moment(new Date()).utcOffset('+11:00').format("YYYY-MM-DD HH:mm:ss"),
            get: function () {
              var isoDateString = new Date(this.getDataValue("updatedAt"));
              return new Date(
                isoDateString.getTime() -
                  isoDateString.getTimezoneOffset() * 60 * 1000
              );
            },
        }
    },
    {
        sequelize: sequelize,
        modelName: 'courses',
        tableName: 'courses',
    }
)

export default Courses;