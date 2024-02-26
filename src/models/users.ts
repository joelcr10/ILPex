import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Users from "../../types/modelTypes/users";
import Roles from "./roles";
import bcrypt from 'bcrypt'

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
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
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
