export default function AuthHeader() {
    let localStorageData = JSON.parse(localStorage.getItem('persist:root/user'));
    
    if (localStorageData && localStorageData.token) {             
        return { 
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age" : "1800",
          "Access-Control-Allow-Headers" : "content-type",
          "Access-Control-Allow-Methods" : "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: `Bearer ${localStorageData.token}`,
        }
    } else {
      return {};
    }
  }