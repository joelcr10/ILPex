import { DataTypes} from 'sequelize';
import sequelize from '../config/sequelize-config';
import Course_Set from '../../types/modelTypes/course_set';
import Courses from './courses';
import Users from './users';
import moment from 'moment';

Course_Set.init(
    {
        course_set_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique : true,
            autoIncrement: true,
            allowNull: false,
        },
        course_set_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
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
    },{
    sequelize,
    modelName: 'course_set',
    tableName: 'course_set',
});

Users.hasMany(Course_Set,{foreignKey:'createdBy'});

export default Course_Set ;
