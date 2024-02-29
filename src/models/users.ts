import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Users from "../../types/modelTypes/users";
import Roles from "./roles";
import bcrypt from 'bcrypt'
import moment from 'moment';
Users.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
     
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
    },
    percipio_email : {
      type : DataTypes.STRING,
      allowNull : true,
      defaultValue : null,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Roles,
        key: "role_id",
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
  },
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
    hooks:{
      beforeCreate:(user:Users)=>{
        const hashedPassword=bcrypt.hashSync(user.password,bcrypt.genSaltSync(10));
        user.password=hashedPassword;
      }
  }
}
);

Users.belongsTo(Roles, { foreignKey: "role_id", targetKey:"role_id"});

export default Users;
