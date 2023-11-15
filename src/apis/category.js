import axios from "customize-axios";

export const apiCategoryVehicle = async () => {
    return await axios.get('/vehicle-category/get-all');
}

export const apiDeleteCategoryVehicle = async (cid) => {
    return await axios.put('/vehicle-category/delete/' + cid, {});
}

export const apiCreateCategoryVehicle = async (category) => {
    return await axios.post('/vehicle-category/create', category);
}

export const apiUpdateCategoryVehicle = async (category) => {
    return await axios.put('/vehicle-category/update', category);
}