import axios from "customize-axios";
import { authHeader } from "ultils/AuthHeader";

export const apiGetAllBooking = async () => {
    return await axios.get('/api/getBookingForAd')
}

export const apiGetBookingById = async (id, token) => {
    return await axios.get('/api/getBookingById/'+id,
    {
        headers: authHeader(token),
    });
}