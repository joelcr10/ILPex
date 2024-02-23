// import express,{Request,Response} from 'express';
// import traineTable from '../../models/trainees'
// import result from '../../models/'
// const app =express();
// app.use(express.json());


// const batchAverage =async(req:Request,res:Response)=>{
//     try{
//         const {batch_id} =req.body;
//         const batch = await traineTable.findAll({
//             attributes:['trainee_id'],
//             where:{batch_id:batch_id}
//     })
//     const numbr = batch.map(item=>
//         item.trainee_id);
//         const length = numbr.length;

//         return res.json(numbr[2]);
//     }catch(error){
//         return res.json(error);
//     }
// }

// export default batchAverage;