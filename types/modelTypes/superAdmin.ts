import { Model } from "sequelize";

class SuperAdmin extends Model{

    public superadmin_id?:number;
    public user_id!:number;
    public name!:string;
    public isActive!:boolean;
    public createdAt ?: Date;
    public updatedAt ?: Date;
    

}

export default SuperAdmin;