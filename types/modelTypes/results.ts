import {Model} from 'sequelize';

class Results extends Model{
    public result_id!: number;
    public assessment_id !: number;
    public trainee_id !: number;
    public first_score?: number;
    public high_score ?: number;
    public assessment_attempts?: number;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
}


export default Results;