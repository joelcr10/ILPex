import sequelize from "../config/sequelize-config";
import { DataTypes } from "sequelize";
import Days from "../../types/modelTypes/days";

Days.init(
    {
        day_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique:true,
            autoIncrement: true,
        },
        day:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: sequelize,
        modelName: 'days',
        tableName: 'days'
    }
);

export default Days;