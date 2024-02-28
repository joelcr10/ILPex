import {Model} from 'Sequelize';

class Assessment_Batch_Allocation extends Model {
    public assessment_batch_allocation_id !: number;
    public assessment_id !: number;
    public batch_id !: number;
    public start_date !: Date;
    public end_date !: Date;
    public assessment_status !: boolean;
    public createdAt ?: Date;
}

export default Assessment_Batch_Allocation;

