import axios from "axios";

const learningActivity = async (reportRequestId:string) => {
    const reportApi = `https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/${reportRequestId}`;
    try{
        const report = await axios.get(reportApi,{
            headers: {
            'Authorization': `Bearer ${process.env.PERCIPIO_TOKEN}`,
            'Content-Type': 'application/json', // Adjust the content type based on your API requirements
            },
        });
        
        return report.data;
    }catch(error){
        console.log(error);
        return null;
    }
}
 
export default learningActivity;