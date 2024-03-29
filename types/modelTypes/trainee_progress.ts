import { Model } from 'sequelize';

class Trainee_Progress extends Model{
    public progress_id? : number;
    public trainee_id! : number;
    public course_id! : string;
    public batch_id!: number;
    public day_number!: number;
    public completion_status! : string;
    public duration? : number;
    public estimated_duration?: number;
    public createdAt ?: Date;

    public updatedAt ?: Date;

    
}
export default Trainee_Progress;