import axios from "customize-axios";
import AuthHeader from "ultils/AuthHeader";

export const apiVehicle = async () => {
    return await axios.get('/vehicle/get-all', { headers: AuthHeader() });
}
