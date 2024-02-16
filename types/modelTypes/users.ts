import { Model } from "sequelize";


class Users extends Model{
    public user_id?:number;
    public username!:string;
    public email!:string;
    public password!:string;
    public role_id!:string;
}

export default Users;