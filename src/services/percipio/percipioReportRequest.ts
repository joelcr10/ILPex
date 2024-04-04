import axios from "axios";

const percipioReportRequest = async () => {

    const currentDate = new Date();
    console.log("current date---->",currentDate);
    const apiUrl = 'https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/learning-activity';
    const bearerToken = process.env.PERCIPIO_TOKEN;
    const reqBody = {
        "start": "2024-04-04T10:10:24Z",
        "end": currentDate,
        "audience": "ALL",
        "contentType": "Course,Linked Content,Scheduled Content,Assessment",
        "csvPreferences": {
          "header": true,
          "rowDelimiter": "\\n",
          "columnDelimiter": ",",
          "headerForNoRecords": false
        },
        "sort": {
          "field": "lastAccessDate",
          "order": "desc"
        },
        "isFileRequiredInSftp": false,
        "formatType": "JSON"
      };

      try{
        const response = await axios.post(apiUrl, reqBody, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json', // Adjust the content type based on your API requirements
          },
        });

        return response.data.id;

      }catch(error){

        return null;
      }

      
}
 
export default percipioReportRequest;