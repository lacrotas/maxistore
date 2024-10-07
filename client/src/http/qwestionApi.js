import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const postQwestion = async (item) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await $host.post('api/qwestionRouter/add', item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (e) {
        return false;
    }
}
export const deleteQwestion = async (id) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        try {
            const { data } = await $host.delete('api/qwestionRouter/delete/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        } catch (e) {
            return false;
        }
    }
}
export const fetchAllQwestion = async () => {
    const { data } = await $host.get('api/qwestionRouter/getAll');
    return data;
}