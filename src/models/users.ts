import sequelize from "../config/sequelize-config";
import { DataTypes, Sequelize } from "sequelize";
import Users from "../../types/modelTypes/users";
import Roles from "./roles";
import bcrypt from "bcrypt";

Users.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
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
  updatedBy:{
      type: DataTypes.INTEGER,
      allowNull:true,
  },
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
    hooks: {
      beforeCreate: (user: Users) => {
        const hashedPassword = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(10)
        );
        user.password = hashedPassword;
      },
    },
  }
);

<<<<<<< HEAD
Users.belongsTo(Roles, { foreignKey: "role_id", targetKey:"role_id"});
=======
// Users.belongsTo(Roles, { foreignKey: "role_id" });
>>>>>>> d3a8e52b095807c8ee597454f30ae42f30f33eff

export default Users;
