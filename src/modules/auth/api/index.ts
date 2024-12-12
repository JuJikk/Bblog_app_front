import { api } from "../../../shared/api";
import {toast} from "react-toastify";

export const logIn = async (email: string, password: string) => {
    try {
        const response = await api.post("auth/login", { email, password });
        console.log(response)
        localStorage.setItem("user_access_token", response.data.token);
        toast.success('You have successfully logged in!');
        return response;
    } catch {
        throw new Error("Failed to sign in");
    }
};

export const singUp = async (email: string, password: string) => {
    try {
        const response = await api.post("auth/signup", { email, password });
        localStorage.setItem("user_access_token", response.data.token);
        toast.success(response.data.message);
        return response;
    } catch {
        throw new Error("You have successfully sign in!");
    }
};