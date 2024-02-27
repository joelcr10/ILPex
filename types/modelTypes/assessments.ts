import { Model } from 'sequelize';
 
class Assessment extends Model{
    public assessment_id !:number;
    public assessment_name !: string;
    public createdAt ?: Date;
    public createdBy ?: number;
  }
  export default Assessment;