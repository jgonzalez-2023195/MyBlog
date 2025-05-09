import React, { useEffect, useState } from 'react'
import { newPublication } from '../routers/services/App'
import toast from 'react-hot-toast'
import { io } from "socket.io-client";

export const usePublication = () => {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const newPublications = async(title, text, mediaPicture, userPublication, course, hashtags)=> {
        const publication = [
            title,
            text, 
            mediaPicture, 
            userPublication, 
            course, 
            hashtags
        ]

        const response = await newPublication(publication)
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
        return toast.success('Publicado')
    }

    useEffect(() => {
        const socket = io('http://localhost:4003')
        socket.on('message')
    }, [])
    

    return {
        newPublications,
        isLoading,
        error,
        setError
    }
}
