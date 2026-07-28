import api from "./api";

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const getProfile = (token) => {
  return api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (token, data) => {
  return api.put("/users/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (token, data) => {
  return api.put("/users/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};