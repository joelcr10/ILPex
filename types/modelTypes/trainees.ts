import { Model } from "sequelize";

class Trainees extends Model{

    public trainee_id?:number;
    public user_id!:number;
    public batch_id!:number;
    public day_id?: number;
    public isActive!:boolean;
    public created_on!:Date;
    public modified_on!:Date;


}

export default Trainees;