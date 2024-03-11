

const calculateAvg =async(sum:any,leng:number)=>{
    let excellent =0
    let good =0
    let poor =0
    let avg =0
    let allSum:number =0

    avg = sum/leng;
    if(avg >=95){
        excellent+=1
    }
    else if(avg >=25){
        good+=1
    }else{
        poor+=1
    }
    allSum += avg;

    return {excellent,good,poor,allSum}
}
export  default calculateAvg;