import { Model } from 'sequelize';
 
class Course_Set extends Model{
    public course_set_id !:number;
    public course_set_name !: string;
    public isActive !: boolean;
    public createdAt ?: Date;
    public createdBy ?: number;
  }
  export default Course_Set;