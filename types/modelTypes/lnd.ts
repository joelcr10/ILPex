import { Model } from "sequelize";

class LnD extends Model{

    public l_and_d_Id?:number;
    public user_id!:number;
    public name!:string;
    public role!:string;
    public isActive!:string;
    public created_quiz!:string;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 

}

export default LnD;