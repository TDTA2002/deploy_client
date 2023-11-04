import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    } else {
      config.headers.token = "undefine";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
