import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

/* main kategory */
export const fetchAllMainKategory = async () => {
    const { data } = await $host.get('api/mainKategoryRouter/getAll');
    return data;
}
export const postMainKategory = async (item) => {
    const token = localStorage.getItem('token');
    const { data } = await $host.post('api/mainKategoryRouter/add', item, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}
export const deleteMainKategory = async (id) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        const { data } = await $host.delete('api/mainKategoryRouter/delete/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        return data;
    }
}
export const updateMainKategory = async (id, item) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        const { data } = await $host.put('api/mainKategoryRouter/update/' + id, item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    }
}

/* kategory */
export const fetchAllKategory = async () => {
    const { data } = await $host.get('api/kategoryRouter/getAll');
    return data;
}
export const fetchAllKategoryByMainKategoryId = async (id) => {
    const { data } = await $host.get('api/kategoryRouter/getAllKategory/' + id);
    return data;
}
export const deleteKategoryByMainKategoryId = async (id) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        try {
            const { data } = await $host.delete('api/kategoryRouter/delete/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data;
        } catch (e) {
            return false;
        }
    }
}
export const postKategory = async (item) => {
    const token = localStorage.getItem('token');
    const { data } = await $host.post('api/kategoryRouter/add', item, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}
export const updateKategory = async (id, item) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        try {
            const { data } = await $host.put('api/kategoryRouter/update/' + id, item, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data;
        } catch (e) {
            return false;
        }
    }
}

/* podkategory */
export const postPodKategory = async (item) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await $host.post('api/podKategoryRouter/add', item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (e) {
        return false;
    }
}
export const fetchAllKategoryByPodKategoryId = async (kategoryId) => {
    const { data } = await $host.get('api/podKategoryRouter/getAllByKategoryId/' + kategoryId);
    return data;
}
export const updatePodKategory = async (id, item) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        try {
            const { data } = await $host.put('api/podKategoryRouter/update/' + id, item, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data;
        } catch (e) {
            return false;
        }
    }
}
export const deletePodKategoryById = async (id) => {
    if (!id) {
        return null;
    } else {
        const token = localStorage.getItem('token');
        try {
            const { data } = await $host.delete('api/podKategoryRouter/delete/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data;
        } catch (e) {
            return false
        }
    }
}
// export const deleteOneSlider = async (id) => {
//     if (!id) {
//         return null;
//     } else {
//         const token = localStorage.getItem('token');
//         const { data } = await $host.delete('api/sliderRouter/delete/' + id, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         )
//         return data;
//     }
// }

// export const fetchOneMeating = async (id) => {
//     if (!id) {
//         return null;
//     } else {
//         const { data } = await $host.get('api/meating/' + id)
//         return data;
//     }
// }

// export const deleteMeatingsByCityId = async (id) => {
//     if (!id) {
//         return null;
//     } else {
//         try {
//             const token = localStorage.getItem('token');
//             const { data } = await $host.delete('api/meating/deleteByCityId/' + id, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//             )
//             return data;
//         } catch (e) { }
//     }
// }