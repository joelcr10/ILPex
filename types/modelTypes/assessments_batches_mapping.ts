import {Model} from 'sequelize';

class Assessments_Batches_Mapping extends Model{
    assessments_batches_mapping_id! : number;
    public batch_id! : number;
    public assessment_id! : number;
    public createdAt ?: Date;
    public updatedAt ?: Date;

}
export default Assessments_Batches_Mapping;