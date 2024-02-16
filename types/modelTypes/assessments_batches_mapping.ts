import {Model} from 'sequelize';

class assessments_batches_mapping extends Model{
    public batch_id! : number;
    public assessment_id! : number;
    public created_on ?: Date;
    public created_by ?: number;
    public modified_on ?: Date;
    public modified_by ?: number; 
}
export default assessments_batches_mapping;