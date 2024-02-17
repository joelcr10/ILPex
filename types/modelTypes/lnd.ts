import { Model } from "sequelize";

class LnD extends Model{

    public l_and_d_Id?:number;
    public user_id!:number;
    public name!:string;
    public isActive!:string;
    public created_quiz!:string;
    public created_on!:Date;
    public modified_on!:Date;
    public created_by!:number;
    public modified_by!:number;

}

export default LnD;