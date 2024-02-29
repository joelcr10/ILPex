import {Model} from 'sequelize';

class Results extends Model{
    public result_id!: number;
    public assessment_batches_allocation_id !: number;
    public trainee_id !: number;
    public first_score?: number;
    public high_score ?: number;
    public assessment_attempts?: number;
    public createdAt ?: Date; 
}


export default Results;