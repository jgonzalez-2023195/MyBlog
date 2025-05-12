import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:4003/v1/blog',
        timeout: 2000
    }
)

//Course
export const getCourseRequest = async()=> {
    try {
        return await apiClient.get('/course/list')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//Publication
export const getPublicationsRequest = async()=> {
    try {
        return await apiClient.get('/publication/list')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const newPublicationRequest = async(publication)=> {
    try {
        return await apiClient.post('/publication/new', publication)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//Comment
export const getCommentsRequest = async()=> {
    try {
        return await apiClient.get(`/comment/list`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const newCommentRequest = async(comment)=> {
    try {
        return await apiClient.post('/comment/new', comment)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}