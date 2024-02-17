import { Model } from 'sequelize';

class assessment extends Model{
    public id ?:number;
    public assessment_name !: string;
    public assessment_date !: Date;
    public no_of_attempts ?: number;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
  }
  export default assessment;