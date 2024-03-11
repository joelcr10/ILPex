

const sumOfScore =async(count:{ high_score: number }[])=>{
    
    let sum:number =0;
    await Promise.all(count.map(async term=>{
        const highScore = term ?.high_score??0
        sum += highScore;
    }))
    return sum;
}
export  default sumOfScore;