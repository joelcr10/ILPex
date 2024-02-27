import userTable from '../../models/users'

const findUserId =async(user_id:number)=>{
    
    const user = await userTable.findOne({where:{user_id:user_id}});
    return user;
}
export  default findUserId;