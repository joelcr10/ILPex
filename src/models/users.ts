import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Users from "../../types/modelTypes/users";
import Roles from "./roles";

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
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "Users",
  }
);

// Users.belongsTo(Roles, { foreignKey: "role_id" });

export default Users;
