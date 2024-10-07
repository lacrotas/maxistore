import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const signIn = async (login, password) => {
    const { data } = await $host.post('api/user/login', { login, password })
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const { data } = await $host.get('api/user/check');
        return jwt_decode(data.token);
    } catch (error) {
        console.error('Check auth error:', error.response ? error.response.data : error.message);
        throw error;
}};