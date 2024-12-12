import axios from "axios";
import {redirectLogin} from "../lib/navigation";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const getToken = () => localStorage.getItem("user_access_token");

export const apiAuth = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

apiAuth.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    },
);

apiAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            redirectLogin()
        }
        console.error(error);
        return Promise.reject(error);
    },
);