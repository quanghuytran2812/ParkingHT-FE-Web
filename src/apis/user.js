import axios from "../customize-axios";
import AuthHeader from "../ultils/AuthHeader";

// export const apiLogin = (data) => axios({
//     url: '/auth/generateToken',
//     method: 'post',
//     data
// })

export const apiLogin = async (credentials) => {
  try {
    const response = await axios.post('/auth/generateToken', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const apiGetUser = async () => {
//   try {
//     const response = await axios.get('/user/get-all');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const apiGetUser = async () =>{
  let localStorageData = localStorage.getItem('persist:root/user');
  localStorageData = JSON.parse(localStorageData);
  const accessToken = JSON.parse(localStorageData?.token);
  console.log("test: "+ accessToken)
  axios
  .get('/user/get-all', 
    { 
      headers: {
        authorization : `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*"
      } })
  .then(res => {
     console.log('profile is:', res);
     return res;  
    })
    .catch(error => console.log(error)) 
}


