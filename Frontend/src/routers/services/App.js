import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:4003/v1/blog',
        timeout: 2000
    }
)

export const getPublications = async()=> {
    try {
        return await apiClient.get('/publication/list')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}