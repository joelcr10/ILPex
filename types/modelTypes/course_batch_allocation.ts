import {Model} from 'sequelize';

class Course_Batch_Allocation extends Model {
    public course_batch_allocation_id !: number;
    public course_set_id !: number;
    public batch_id !: number;
    public createdBy !: number;
    public createdAt ?: Date;
    public updatedAt ?: Date;
}

export default Course_Batch_Allocation;

