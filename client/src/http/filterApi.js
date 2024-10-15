import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const postFilterForKategory = async (item) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await $host.post('api/attributeRouter/add', item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (e) {
        return false;
    }
}
export const fetchAllAttributeByKategoryId = async (id) => {
    if (!id) {
        return null;
    } else {
        const { data } = await $host.get('api/attributeRouter/getAllByKategoryId/' + id);
        return data;
    }
}
export const fetchAttributeById = async (id) => {
    if (!id) {
        return null;
    } else {
        const { data } = await $host.get('api/attributeRouter/getAttributeById/' + id);
        return data;
    }
}

export const fetchAllAttributeByPodKategoryId = async (id) => {
    if (!id) {
        return null;
    } else {
        const { data } = await $host.get('api/attributeRouter/getAllByPodKategoryId/' + id);
        return data;
    }
}
export const deleteAttribute = async (id) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        const { data } = await $host.delete('api/attributeRouter/delete/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        return data;
    }
}