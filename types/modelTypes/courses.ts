import {Model} from 'sequelize';

class Courses extends Model{
    public course_id!: number;
    public day_number !: number;
    // public course_date !: Date;
    public course_name!: string;
    public course_type !: string;
    // public course_link?: string;
    public course_duration?: string;
    public createdAt ?: Date;
    public createdBy ?: number;
    public updatedAt ?: Date;
    public updatedBy ?: number; 
}


export default Courses;