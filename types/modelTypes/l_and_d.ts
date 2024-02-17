import { Model } from "sequelize";

class l_and_d extends Model{

    public l_and_d_Id?:number;
    public user_id!:number;
    public name!:string;
    public isActive!:string;
    public created_quiz!:string;
    public createdAt ?: Date;
    public updatedAt ?: Date;
   

}

export default l_and_d;