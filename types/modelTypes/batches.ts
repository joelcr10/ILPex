import { Model } from "sequelize";

class Batches extends Model{
    public batch_id?:number;
    public batch_name!:string;
    public start_date!:Date;
    public end_date!:Date;
    public isActive?:boolean;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
}

export default Batches;