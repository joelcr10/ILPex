import { Model } from "sequelize";

class Roles extends Model{
    public role_id!:number;
    public role_name!:string;
}

export default Roles;