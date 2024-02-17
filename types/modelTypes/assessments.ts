import { Model } from 'sequelize';
 
class Assessment extends Model{
    public assessment_id ?:number;
    public assessment_name !: string;
    public assessment_date !: Date;
    public no_of_attempts ?: number;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
  }
  export default Assessment;