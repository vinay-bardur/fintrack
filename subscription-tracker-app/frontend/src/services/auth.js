import api from "./api";

export const login = async (user) => {
  const response = await api.post("/auth/login", {
    email: user.email,
    password: user.password,
  });
  return response;
};

export const register = async (user) => {
  const response = await api.post("/auth/register", {
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
    password: user.password,
  });
  return response;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  window.location.replace("/login");
};
