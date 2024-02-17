import {Model} from 'sequelize';

class assessments_batches_mapping extends Model{
    public batch_id! : number;
    public assessment_id! : number;
    public createdAt ?: Date;
    public updatedAt ?: Date;

}
export default assessments_batches_mapping;