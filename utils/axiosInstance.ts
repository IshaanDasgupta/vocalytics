import axios from "axios";
import { DEV_ENV } from "@/constants/Environment";

const axiosInstance = axios.create({
    baseURL: DEV_ENV.baseUrl,
    headers: {
        Authorization: `Bearer ${DEV_ENV.authorization}`,
        "Content-Type": "application/json",
        apikey: DEV_ENV.apikey,
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        //use authorization token of user
        // const token = localStorage.getItem("token");
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
