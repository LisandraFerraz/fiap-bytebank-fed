import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },

  (error) => {
    if (error.response?.status === 401) {
      throw new Error("Acesso não autorizado. Faça o login para prosseguir.");
    }

    return Promise.reject(error);
  }
);
