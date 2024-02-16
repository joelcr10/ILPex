import { Model } from 'sequelize';

class questions extends Model{
    public question_id? : number;
    public assessment_id! : number;
    public questions_text! : string;
    public option_a! : string;
    public option_b! : string;
    public option_c! : string;
    public option_d! : string;
    public correct_answer! : string;
    public created_on ?: Date;
    public created_by ?: number;
    public modified_on ?: Date;
    public modified_by ?: number;
}
export default questions;