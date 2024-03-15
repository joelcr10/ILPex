import { Model } from 'sequelize';
 
class Percipio_Assessment extends Model{
    public percipio_assessment_id!: number;
    public trainee_id!: number;
    public batch_id!: number;
    public course_id! : number;
    public day_number!: number;
    public first_score!: number;
    public high_score!: number;
    public last_score?: number;  
}
  export default Percipio_Assessment;