import axios from "customize-axios";

export const apigetallReport = async () => {
    return await axios.get('/report/get-all');
}

export const apiCountReportUnread = async () => {
    return await axios.get('/report/get-count-unread/0');
}

export const apiListReportUnread = async () => {
    return await axios.get('/report/get-unread/0');
}

export const apiUpdateReport = async (report) => {
    return await axios.put('/report/update', report);
}