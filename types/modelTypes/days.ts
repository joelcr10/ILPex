import { Model } from "sequelize";



class Days extends Model{
    public day_id!: number;
    public day?: string;
}


export default Days;
