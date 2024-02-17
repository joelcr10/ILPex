import { Model } from "sequelize";

class Trainees extends Model{

    public trainee_id?:number;
    public user_id!:number;
    public batch_id!:number;
    public name!:string;
    public isActive!:string;
    public created_on!:Date;
    public modified_on!:Date;

}

export default Trainees;