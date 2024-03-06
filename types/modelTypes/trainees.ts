import { Model } from "sequelize";

class Trainees extends Model{
    

    public trainee_id?:number;
    public user_id!:number;
    public batch_id!:number;
    public isActive!:boolean;
    public createdAt!:Date;
    public createdBy ?: number;
}

export default Trainees;