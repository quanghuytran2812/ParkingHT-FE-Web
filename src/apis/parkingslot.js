import axios from "customize-axios";
import AuthHeader from "ultils/AuthHeader";

export const apiParkingSlot = async () => {
    return await axios.get('/parking-slot/get-all', { headers: AuthHeader() });
}

export const apiDeleteParkingSlot = async (cid) => {
    return await axios.put('/parking-slot/delete/' + cid, {}, { headers: AuthHeader() });
}