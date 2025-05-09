import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

let tryRefresh = true;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && tryRefresh) {
      tryRefresh = false;
      await api.post("/token/refresh");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;
