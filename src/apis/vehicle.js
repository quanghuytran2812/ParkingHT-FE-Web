import axios from "customize-axios";

export const apiVehicle = async () => {
    return await axios.get('/vehicle/get-all');
}
