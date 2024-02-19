import { UUID } from "mongodb";
import { Model } from "sequelize";


class Users extends Model{
    public user_id?:number;
    public user_name!:string;
    public email!:string;
    public user_uuid!:UUID;
    public role_id!:number;
    public createdAt ?: Date;
}

export default Users;