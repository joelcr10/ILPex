import { Model } from "sequelize";

class LnD extends Model{

    public l_and_d_Id?:number;
    public user_id!:number;
    public name!:string;
    public role!:string;
    public isActive!:string;
    public created_quiz!:string;
    public created_on!:Date;
    public modified_on!:Date;


}

export default LnD;