import { Model } from "sequelize";

class Batches extends Model{
    public batch_id?:number;
    public batch_name!:string;
    public start_date!:Date;
    public end_date!:Date;
    public current_day!:number;
    public isActive?:boolean;
    public created_on?:Date;
    public created_by?:number;
    public modified_on?:Date;
    public modified_by?:number;
}

export default Batches;