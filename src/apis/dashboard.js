import axios from "customize-axios";

export const apiDashboard = async () => {
    return await axios.get('/api/dashboard');
}