import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Roles from "./roles";
import Users from "./users";
import LnD from "../../types/modelTypes/lnd";
import SuperAdmin from "./superadmin";

LnD.init(
  {
    l_and_d_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "user_id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: Users,
      //   key: "user_name",
      // },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: Roles,
      //   key: "role_name",
      // },
    },
    isActive: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_quiz: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize,
    modelName: "LnD",
    tableName: "LnD",
  }
);

export default LnD;
