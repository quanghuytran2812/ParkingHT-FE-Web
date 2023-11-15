import { jwtDecode } from "jwt-decode";

function getAccessToken() {
  let localStorageData = localStorage.getItem('persist:root/user');
  localStorageData = JSON.parse(localStorageData);
  const accessToken = JSON.parse(localStorageData?.token);
  return accessToken;
}

export default function getTokenInfo() {
  const accessToken = getAccessToken();
  const tokenInfo = jwtDecode(accessToken);
  if (tokenInfo) {
    return {
      id: tokenInfo.id,
      role: tokenInfo.role
    };
  } else {
    return {};
  }
}
