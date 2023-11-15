import axios from "customize-axios";

export const apiLogin = async (credentials) => {
  return await axios.post('/auth/generateToken', credentials);
}

export const apiGetUserById = async (userid) => {
  return await axios.get('/user/get-by-id/'+userid);
}

export const apiGetUser = async () => {
  return await axios.get('/user/get-all');
}

export const apiDeleteUser = async (uid) => {
  return await axios.put('/user/delete/' + uid, {});
}

