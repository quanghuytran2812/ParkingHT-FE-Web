import axios from "../customize-axios";
import AuthHeader from "../ultils/AuthHeader";

export const apiLogin = async (credentials) => {
    return await axios.post('/auth/generateToken', credentials);
};

export const apiGetUser = async () =>{
  return await axios.get('/user/get-all', { headers: AuthHeader() });
}

export const apiDeleteUser = async (uid) =>{
  return await axios.put('/user/delete/' + uid, {},{ headers: AuthHeader() });
}

