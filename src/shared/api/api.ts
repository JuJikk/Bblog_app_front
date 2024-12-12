import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const api = axios.create({
    baseURL: BACKEND_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error);
        return Promise.reject(error);
    },
);