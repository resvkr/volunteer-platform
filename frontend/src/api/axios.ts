import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().access_token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/unauthorized'
        }
        return Promise.reject(error instanceof Error ? error : new Error(error))
    }
)

export default api
