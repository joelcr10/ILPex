import axios from "axios";

const percipioReportRequest = async () => {
    const apiUrl = 'https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/learning-activity';
    const bearerToken = process.env.PERCIPIO_TOKEN;
    const reqBody = {
        "timeFrame": "DAY",
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

      const response = await axios.post(apiUrl, reqBody, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        },
      });

      return response.data.id;
}
 
export default percipioReportRequest;