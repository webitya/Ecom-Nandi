import axios from "axios"

export const useRequestApi = async (
    endpoint,
    method = 'GET',
    body
) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios({
            url: `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
            method: method,
            data: body || undefined,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });
        console.log('useapirequest', response);
        return response.data;
    } catch (error) {
        throw error
    }
}
