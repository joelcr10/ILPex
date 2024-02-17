import { Model } from "sequelize";

class Trainees extends Model{

    public trainee_id?:number;
    public user_id!:number;
    public batch_id!:number;
    public isActive!:string;
    public createdAt ?: Date;
    public updatedAt ?: Date;


}

export default Trainees;