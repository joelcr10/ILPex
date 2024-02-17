import {Model} from 'sequelize';

class assessments_batches_mapping extends Model{
    public batch_id! : number;
    public assessment_id! : number;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
}
export default assessments_batches_mapping;