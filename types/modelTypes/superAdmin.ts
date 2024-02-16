import { Model } from "sequelize";

class SuperAdmin extends Model{

    public superadmin_id?:number;
    public name!:string;
    public role!:string;
    public isActive!:string;
    public created_on!:Date;
    public modified_on!:Date;

}

export default SuperAdmin;