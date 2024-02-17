import { Model } from "sequelize";

class SuperAdmin extends Model{

    public superadmin_id?:number;
    public user_id!:number;
    public name!:string;
    public isActive!:boolean;
    public created_on!:Date;
    public modified_on!:Date;

}

export default SuperAdmin;