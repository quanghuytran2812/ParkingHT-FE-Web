import axios from "customize-axios";

export const apiGetAllBooking = async () => {
    return await axios.get('/api/getBookingForAd')
}