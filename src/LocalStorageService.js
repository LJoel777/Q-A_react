export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setLocalStorageSession = (session) => localStorage.setItem("session", session);
export const setLocalStorageUsername = (username) => localStorage.setItem("username", username);
export const setLocalStorageHobbies = (hobbies) => localStorage.setItem("hobbies", hobbies);
