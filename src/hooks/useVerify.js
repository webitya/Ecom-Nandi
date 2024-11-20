import axios from "axios"
import { useRequestApi } from "./useRequestApi"


export const useVerify = async (token, setError) => {
    try {
        const response = await useRequestApi(`api/auth/verify?token=${token}`)
        return response
    } catch (error) {
        setError(error?.response?.data?.message || 'Check your connection')
        return null
    }
}