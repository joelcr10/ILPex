import { Model } from "sequelize";

class Roles extends Model{
    public role_id!:number;
    public role_name!:string;
    public createdAt!:Date;
    public updatedAt!:Date;
}

export default Roles;