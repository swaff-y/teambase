export const authHeaders = () => {
  const authHeaders = {
    Authorization: 'Bearer ' + localStorage.jwt
  }
  // console.log("authHeaders: ", authHeaders);
  return authHeaders;
}
