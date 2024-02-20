//created by Joel


import {Request, Response} from 'express';
// import Days from '../../models/daysModel.ts';


// const createDays = async (req: Request, res: Response) =>{
//     try{
//         const {number_of_days} = req.body;
//         if(!number_of_days){
//             return res.status(404).json({message: 'missing body'});
//         }

//         // const newDay = Days.create({ day: 'day1'});
//         // console.log(Days);
//         for(let i=1;i<=number_of_days;i++){
//             await Days.create({
//                 day: 'day-'+i,
//             })
//         }

//         return res.status(200).json({message: 'created days successfully'});
//     }catch(error){
//         return res.status(404).json({message: error});
//     }
// }

// export default createDays;