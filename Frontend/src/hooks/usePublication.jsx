import React, { useState } from 'react'
import { newPublicationRequest } from '../routers/services/App'
import toast from 'react-hot-toast'
import { io } from "socket.io-client";

const socket = io('http://localhost:4003')

export const usePublication = () => {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const publications = async(data, image, course)=> {
        setIsLoading(true)
        const publication = {
            title: data?.title,
            text: data?.text,
            mediaPicture: image,
            userPublication: data?.userPublication,
            course: course,
            hashtags: data?.hashtags
        }

        const response = await newPublicationRequest(publication)
        setIsLoading(false)
        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                let arrayErros = response?.e?.response?.data?.errors
                for(const error of arrayErros) {
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar crear una publicacion'
            )
        }
        setError(false)
        socket.emit('message', { ...publication, image })
        return toast.success('Publicado')
    }
    

    return {
        publications,
        isLoading,
        error,
        setError
    }
}
