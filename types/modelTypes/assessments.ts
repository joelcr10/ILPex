import { Model } from 'sequelize';

class assessment extends Model{
    public assessment_id ?:number;
    public assessment_name !: string;
    public batch_id !: number;
    public user_id !: number;
    public assessment_date !: Date;
    public no_of_attempts ?: number;
    public created_on ?: Date;
    public created_by ?: number;
    public modified_on ?: Date;
    public modified_by ?: number;
  
  }
  export default assessment ;