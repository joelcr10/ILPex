import {Model} from 'sequelize';

class Assessment_Batch_Allocation extends Model {
    public assessment_batch_allocation_id !: number;
    public assessment_id !: number;
    public batch_id !: number;
    public number_of_attempts ?: number;
    public start_date !: Date;
    public end_date !: Date;
    public assessment_status !: boolean;
    public createdBy !: number;
    public createdAt ?: Date;
    public updatedAt ?: Date;
}

export default Assessment_Batch_Allocation;

