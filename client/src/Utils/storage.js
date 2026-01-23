export const setToken = (token) => localStorage.setItem("access_token", token);
export const getToken = () => localStorage.getItem("access_token");
export const setRole = (role) => localStorage.setItem("role", role);
export const getRole = () => localStorage.getItem("role");
export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  localStorage.removeItem("id");
};
