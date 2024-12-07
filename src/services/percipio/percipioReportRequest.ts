import axios from "axios";

const percipioReportRequest = async (start_date, end_date) => {
    let currentDate = new Date();
    end_date.setDate(end_date.getDate() + 1);
    let currentDateString = currentDate.toISOString();
    end_date = end_date.toISOString();
    let end_date_date_part = end_date.split("T")[0];
    let current_date_time_part = currentDateString.split("T")[1];

    const updated_end_date = end_date_date_part + "T" + current_date_time_part;
    const apiUrl =
        "https://api.percipio.com/reporting/v1/organizations/7d980d20-af30-4dde-a9d7-9632c96541b9/report-requests/learning-activity";
    const bearerToken = process.env.PERCIPIO_TOKEN;
    const reqBody = {
        start: start_date,
        end: updated_end_date,
        audience: "ALL",
        contentType: "Course,Linked Content,Scheduled Content,Assessment",
        csvPreferences: {
            header: true,
            rowDelimiter: "\\n",
            columnDelimiter: ",",
            headerForNoRecords: false,
        },
        sort: {
            field: "lastAccessDate",
            order: "desc",
        },
        isFileRequiredInSftp: false,
        formatType: "JSON",
    };

    try {
        const response = await axios.post(apiUrl, reqBody, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json", // Adjust the content type based on your API requirements
            },
        });

        return response.data.id;
    } catch (error) {
        return null;
    }
};

export default percipioReportRequest;
