// created by Joel
import {Model} from 'sequelize';

class Course_Day_Mapping extends Model{
    public course_day_mapping_id!: number;
    public day_id!: number;
    public course_id!: number;
}

export default Course_Day_Mapping;