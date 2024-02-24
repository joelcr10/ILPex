import {Model} from 'sequelize';

class Course_Type extends Model{
    public course_type_id!: number;
    public course_type_name!: string;
}

export default Course_Type;