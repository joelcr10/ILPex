import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Roles from "./roles";
import Users from "./users";
import L_And_D from "../../types/modelTypes/l_and_d";
import SuperAdmin from "./superadmin";

L_And_D.init(
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
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
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
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: SuperAdmin, 
         key: 'superadmin_id',
        },
    },
    modified_by:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
         model: SuperAdmin, 
         key: 'superadmin_id',
        },
    },
  },
  {
    sequelize,
    modelName: "l_and_d",
    tableName: "l_and_d",
  }
);

L_And_D.belongsTo(Users,{foreignKey: "user_id"});

export default L_And_D;
