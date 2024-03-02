import { Model } from 'sequelize';

class Trainee_Progress extends Model{
    public progress_id? : number;
    public trainee_id! : number;
    public course_id! : string;
   
    public day_number!: number;
    public completion_status! : string;
    public createdAt ?: Date;

    public updatedAt ?: Date;

    
}
export default Trainee_Progress;