import {Model} from 'sequelize';

class Assessments_Batches_Mapping extends Model{
    public batch_id! : number;
    public assessment_id! : number;
    public createdAt ?: Date;
    public updatedAt ?: Date;

}
export default Assessments_Batches_Mapping;