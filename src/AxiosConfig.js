import axios from "axios";
import { getToken } from "./helpers/LocalStorageService";

axios.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = "Bearer " + getToken();
    }
    config.headers.WithCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
