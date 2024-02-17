import { Model } from "sequelize";

class SuperAdmin extends Model{

    public superadmin_id?:number;
    public user_id!:number;
    public name!:string;
    public role!:string;
    public isActive!:boolean;
    public createdAt ?: Date;
    public updatedAt ?: Date;
    public updatedBy ?: number; 

}

export default SuperAdmin;