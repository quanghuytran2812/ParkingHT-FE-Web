import axios from "customize-axios";
import AuthHeader from "ultils/AuthHeader";

export const apiParkingSlot = async () => {
    return await axios.get('/parking-slot/get-all', { headers: AuthHeader() });
}

export const apiDeleteParkingSlot = async (cid) => {
    return await axios.put('/parking-slot/delete/' + cid, {}, { headers: AuthHeader() });
}

export const apiAddParkingSlot = async (parkingslot) => {
    return await axios.post('/parking-slot/create', parkingslot, { headers: AuthHeader() });
}

export const apiEditParkingSlot = async (parkingslot) => {
    return await axios.put('/parking-slot/update', parkingslot, { headers: AuthHeader() });
}