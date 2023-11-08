import axios from "customize-axios";
import AuthHeader from "ultils/AuthHeader";

export const apiCategoryVehicle = async () => {
    return await axios.get('/vehicle-category/get-all', { headers: AuthHeader() });
}

export const apiDeleteCategoryVehicle = async (cid) => {
    return await axios.put('/vehicle-category/delete/' + cid, {}, { headers: AuthHeader() });
}

export const apiCreateCategoryVehicle = async (category) => {
    return await axios.post('/vehicle-category/create', category, { headers: AuthHeader() });
}