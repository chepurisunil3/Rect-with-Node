export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};
