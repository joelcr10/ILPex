import axios from "axios";

const percipioReport = async() =>{
    const apiUrl = 'https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/learning-activity';
    const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlX2FjY291bnRfaWQiOiJjMTMxYTE0Yi05ZDFjLTQzZTktYjIxZi0wM2ZkZjM2Nzg0MmIiLCJvcmdhbml6YXRpb25faWQiOiI3ZDk4MGQyMC1hZjMwLTRkZGUtYTlkNy05NjMyYzk2NTQxYjkiLCJpc3MiOiJhcGkucGVyY2lwaW8uY29tIiwiaWF0IjoxNzA3NzQ3MDQ0LCJzdWIiOiI4ZjNiOTFiNDE0NjViYWQ5ODU2ZjNiYzRkZTU2NTY3YTQ2MDgzZjE3IiwicG9saWN5LWlkIjoicGVyY2lwaW8tYXBpLXN0YW5kYXJkLXBvbGljeSJ9.BI0rFq8KJLh9l6moKaZsi84SRMGZW1CFwUrxnBVTL0lPW0Ps4pUQ8_hJeQaWMBzJeCXdTbYl04y7ny8PwB4by1iLiVuROmwK5Jo6ohDnL-5oWlNleGNQUbeDD4IQPXbF0gYhGY59v65NGuMh1CGnFKDZ-BA1xmM2TrW9LykjH-OtYzFkXBOIKhZymCJmKHNbuJ-yN6_sqEpAVVcSZIHUxnDMSMUgTXkaT-uHXY0wgI_1U8mhJZJ6zxzx38R6A6t7gmAUdpzIAtfYUluwkftB4BLeAgH7KqEXE9qE4FkLuyX-6oNn2RBKAIlIxaEAh7mlWnUg_qft-n4RPzIaJQKT9Uek2k-iKzz8AlzK_GnARyXZhujtK_u3SReVXFsBh8wK0FS9lDlsIpGkOoqr1H84-HMbbZZoLuGB4_ylCuUHdVyf4149ejAb1WrGVnuFshF3a_UJTQ5i5bPRwR6EHPjNlhXuHup4vcEV2PnlyTc-bPsoLvV1FxMTH1E4afEZ4-w7L6Drl3kjGeR8ZZbVFOGN_7IuXsBfJ4UDM6SmnT2gOGnyPsL_z-1teakFxrl0LE4z0cRxaew4uIsc5B5CCy91g2pBjnZ3BxHNIiL5t_gwH0OaxZxD9MaplxAR2NPfKKDMQPWG75-A9rAnGi7W-xALFTz6JxR6jb2yjP_NwDqbHwE';
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


      console.log(response.data);
      console.log('testing stash');

      

}   


export default percipioReport;