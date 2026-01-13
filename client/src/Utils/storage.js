export const setToken = (token) => {
  localStorage.setItem('access_token', token);
};

export const getToken = () => {
  return localStorage.getItem('access_token') || null;
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
};
