import { Model } from 'sequelize';

class questions extends Model{
    public question_id? : number;
    public assessment_id! : number;
    public question! : string;
    public option_a! : string;
    public option_b! : string;
    public option_c! : string;
    public option_d! : string;
    public correct_answer! : string;
    
}
export default questions;