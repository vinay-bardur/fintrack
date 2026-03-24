import api from "./api";

// active subscriptions related operation
export const getActiveSubscriptionsViaApi = () => {
  const response = api.get("/api/subscription/active");
  return response;
};

export const createActiveSubscriptionViaApi = (data) => {
  const response = api.post("/api/subscription/active", data);
  return response;
};

export const updateActiveSubscriptionViaApi = (id, data) => {
  const response = api.put(`/api/subscription/active/${id}`, data);
  return response;
};

export const deleteActiveSubscriptionViaApi = (id, data) => {
  const response = api.delete(`/api/subscription/active/${id}`, data);
  return response;
};

// free trial subscriptions related operation
export const getFreeTrialsViaApi = () => {
  const response = api.get("/api/subscription/freetrial");
  return response;
};

export const createFreeTrialViaApi = (data) => {
  const response = api.post("/api/subscription/freetrial", data);
  return response;
};

export const updateFreeTrialViaApi = (id, data) => {
  const response = api.put(`/api/subscription/freetrial/${id}`, data);
  return response;
};

export const deleteFreeTrialViaApi = (id, data) => {
  const response = api.delete(`/api/subscription/freetrial/${id}`, data);
  return response;
};
// user related operation
export const getUserByEmailViaApi = (email) => {
  const response = api.get(`/api/user/${email}`);
  return response;
};
