export default function AuthHeader() {
  let localStorageData = localStorage.getItem('persist:root/user');
  localStorageData = JSON.parse(localStorageData);
  const accessToken = JSON.parse(localStorageData?.token);
  if (accessToken) {
    return {
      authorization: `Bearer ${accessToken}`,
    }
  } else {
    return {};
  }
}