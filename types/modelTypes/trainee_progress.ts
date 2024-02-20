import { Model } from 'sequelize';

class Trainee_Progress extends Model{
    public progress_id? : number;
    public trainee_id! : number;
    public course_id! : string;
    public due_date! : Date;
    public completion_status! : string;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
    
}
export default Trainee_Progress;