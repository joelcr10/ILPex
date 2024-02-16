import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Users from "../../types/modelTypes/users";
import Roles from "./roles";

Users.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique : true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  createdBy:{
      type: DataTypes.INTEGER,
      allowNull:true,
  },
  modifiedBy:{
      type: DataTypes.INTEGER,
      allowNull:true,
  },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "Users",
  }
);

Users.belongsTo(Roles, { foreignKey: "role_id" });

export default Users;
