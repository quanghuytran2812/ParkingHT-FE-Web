import axios from "customize-axios";

export const apiParkingSlot = async () => {
    return await axios.get('/parking-slot/get-all');
}

export const apiDeleteParkingSlot = async (cid) => {
    return await axios.put('/parking-slot/delete/' + cid, {});
}

export const apiAddParkingSlot = async (parkingslot) => {
    return await axios.post('/parking-slot/create', parkingslot);
}

export const apiEditParkingSlot = async (parkingslot) => {
    return await axios.put('/parking-slot/update', parkingslot);
}