import {Model} from 'sequelize';

class Courses extends Model{
    public course_id!: number;
    public course_name!: string;
    public course_link?: string;
    public course_duration?: string;
    public created_on?: Date; 
}


export default Courses;